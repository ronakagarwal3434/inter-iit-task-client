
import './App.css';
import YoutubeList from "./youtube_list";
import { Typography} from "@mui/material";
function App() {
  return (
    <div className="App">
      <Typography my={3} fontFamily='Poppins' fontSize={25}>List of Fetched Videos</Typography>
      <YoutubeList embedId="rokGy0huYEA" />
    </div>
  );
}

export default App;
