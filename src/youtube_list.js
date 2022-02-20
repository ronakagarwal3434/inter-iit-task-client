import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import getVideoId from "get-video-id";
import { Grid, Box, Paper } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Pagination from "@mui/material/Pagination";
import axios from "axios";
import { url } from "./serviceConfig";

const YoutubeList = ({ embedId }) => {
  const [List, setList] = useState([]);

  useEffect(() => {
    getCount();
    getVideos(1);
  }, []);
  const [count, setCount] = useState(0);
  async function getVideos(number) {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/videolinks/${number}`);
      var responseData = response.data;
      var videos = [];
      responseData.forEach((item) => {
        videos.push(item.link);
      });
      setList(videos);
      setLoading(false);
      console.log(List);
    } catch (error) {
      console.error(error);
    }
  }
  async function getCount() {
    try {
      const response = await axios.get(`${url}/count`);
      console.log(response.data);
      setCount(Math.ceil(response.data / 5));
    } catch (error) {
      console.error(error);
    }
  }
  const [loading, setLoading] = useState(true);

  return (
    <Box>
      <Grid container display='flex' justifyContent='center'>
        {loading ? (
          <CircularProgress />
        ) : (
          List.map((item) => {
            const { id } = getVideoId(item);
            return (
              <Grid marginBottom={6} mx={1} item xs={6} sm={4} md={3}>
                <Paper
                  sx={{
                    display: "flex",
                    px: 0.2,
                    py: 0.8,
                    flexDirection: "column",
                    backgroundColor: "#fff",
                    boxShadow: "6px 6px 6px rgba(0, 0, 0, 0.25)",
                  }}
                  elevation={6}
                >
                  <iframe
                    height={200}
                    src={`https://www.youtube.com/embed/${id}`}
                    frameBorder='0'
                    allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                    allowFullScreen
                    title='Embedded youtube'
                  />
                </Paper>
              </Grid>
            );
          })
        )}
        <Grid container display='flex' justifyContent='center'>
          <Pagination
            onChange={(event, number) => {
              getVideos(number);
            }}
            count={count}
            color='secondary'
          />
        </Grid>
      </Grid>
    </Box>
  );
};

YoutubeList.propTypes = {
  embedId: PropTypes.string.isRequired,
};

export default YoutubeList;
