import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Step1 from "./utils/Step1";
import Step2 from "./utils/Step2";
import Step3 from "./utils/Step3";
import { createCourse, editCourse } from "../../../utils/api";

const steps = [
  "Create Thumbnail",
  "Choose available time slots",
  "Complete upload",
];

export default function CourseCreate({ mode, setMode, data, dispatch }) {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === steps?.length - 1;
  const allStepsCompleted = () => completedSteps() === steps?.length;

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    for (const key in data) {
      if (data.hasOwnProperty(key) && key !== "image") {
        formData.append(key, data[key]);
      }
    }
    typeof(data.image) == 'object' && formData.append("image", data.image, data?.image?.name);
    data?._id ? editCourse(formData) : createCourse(formData)
    handleComplete()
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return <Step1 data={data} dispatch={dispatch} />;
      case 1:
        return <Step2 data={data} dispatch={dispatch} />;
      case 2:
        return <Step3 data={data} dispatch={dispatch} />;
      default:
        throw new Error("Unknown step");
    }
  }

  const breadcrumbs = [
    <Link key={1} underline="hover" onClick={() => setMode("list")}>
      Courses
    </Link>,
    <Typography key={2} color="text.primary" fontSize={"small"}>
      {mode.charAt(0).toUpperCase() + mode.slice(1)} course
    </Typography>,
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <Stack spacing={2} p={2}>
        <Breadcrumbs separator="›" aria-label="breadcrumb" fontSize={"small"}>
          {breadcrumbs}
        </Breadcrumbs>
      </Stack>
      <Stepper nonLinear activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton color="inherit" onClick={() => setActiveStep(index)}>
              {label}
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <div>
        {allStepsCompleted() ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
              {getStepContent(activeStep)}
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
              {activeStep !== steps.length &&
                (completed[activeStep] ? (
                  <Typography
                    variant="caption"
                    sx={{ display: "inline-block" }}
                  >
                    Step {activeStep + 1} already completed
                  </Typography>
                ) : completedSteps() === steps?.length - 1 ?
                  <Button onClick={handleSubmit}>
                    FINISH
                  </Button> : <Button onClick={handleComplete}>
                    SAVE DETAILS
                  </Button>
                )}
            </Box>
          </React.Fragment>
        )}
      </div>
    </Box>
  );
}
