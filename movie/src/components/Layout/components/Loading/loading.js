import './loading.css'; // Import file CSS
import { useEffect } from 'react';
import ScaleLoader from "react-spinners/ScaleLoader"
function Loading() {
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <div className="loading-spinner">
      <ScaleLoader />
    </div>
  );
}

export default Loading;
