import React, { useEffect, useState } from 'react';
import TutorLayout from '../../layout/TutorLayout';
import CourseList from '../../components/tutor/courses/CourseList';
import CourseCreate from '../../components/tutor/courses/CourseEdit';
import { useSelector } from 'react-redux';
import { fetchCourses } from '../../utils/api';

const Courses = () => {
  const user = useSelector((state) => state?.data?.user);
  const initialState = {
    author: user?._id,
    time: ['2022-04-17T15:30', '2022-04-17T18:30'],
    availableDays: [2,3,4,5,6],
  };
  const [data, setData] = useState([]);
  const [mode, setMode] = useState('list');
  const [selected, setSelected] = useState(initialState);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    user && fetchData();
    console.log(user);
  }, [user]);
  useEffect(() => {
    if(mode==='create')setSelected(initialState)
    console.log(mode);
  }, [mode]);

  const fetchData = async () => {
    await fetchCourses(user?._id).then((res) => {
      setData(res);
      setIsDataLoaded(true);
    });
  };

  return (
    <TutorLayout>
      {isDataLoaded ? (
        mode === 'list' ? (
          !!data?.length ? (
            <CourseList data={data} setMode={setMode} dispatch={setSelected} />
          ) : (
            <CourseCreate
              data={selected}
              dispatch={setSelected}
              setMode={setMode}
              mode={'create'}
            />
          )
        ) : (
          <CourseCreate
            data={selected}
            dispatch={setSelected}
            setMode={setMode}
            mode={mode}
          />
        )
      ) : (
        <p>Loading...</p>
      )}
    </TutorLayout>
  );
};

export default Courses;
