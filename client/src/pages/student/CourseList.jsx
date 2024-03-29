import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import styled from "@emotion/styled";
import SearchAppBar from "../../components/student/courses/SearchBar";
import Filter from "../../components/student/courses/Filter";
import Layout from "../../layouts/Layout";
import Cards from "../../components/student/courses/Cards";

const FiliterContainer = styled(Container)({});

const LeftSide = styled(Box)({
  display: "flex",
  flexDirection: "column",
  paddingTop: "10px",
  margin: { sx: 0, sm: 0, md: 0, lg: 0, xl: 0 },
  marginTop: { md: 2, lg: 2, xl: 2, sx: 0 },
  marginLeft: { md: 2, lg: 2, xl: 2 },
});
function totalElements(obj) {
  let totalCount = 0;
  for (const key in obj) {
    if (obj.hasOwnProperty(key) && Array.isArray(obj[key])) {
      totalCount += obj[key].length;
    }
  }
  return totalCount
}
export default function CourseList() {
  const [filters, setFilters] = useState({})
  const [filterCount, setCount] = useState(0)
  const [search, setSearch] = React.useState('')
  useEffect(() => {
    console.log(search);
    setFilters(prev => ({ ...prev, search }))
    console.log(filters);
  }, [search])

  useEffect(() => {
    const count = totalElements(filters)
    setCount(count)
  }, [filters])
  useEffect(() => {
    !filterCount && setFilters({})
  }, [filterCount])
  return (
    <Container>
      <Layout>
        <FiliterContainer>
          <SearchAppBar filterCount={filterCount} search={search} apply={setSearch} removeFilter={setCount} />
          <Grid container >
            <Grid item xs={12} md={3} lg={2.5} marginTop={1}>
              <Filter filter={filterCount} apply={setFilters} />
            </Grid>
            <Grid item xs={12} md={9} sm={12} lg={9.5}>
              <LeftSide>
                <Cards filter={filters} />
              </LeftSide>
            </Grid>
          </Grid>
        </FiliterContainer>
      </Layout>
    </Container>
  );
}
