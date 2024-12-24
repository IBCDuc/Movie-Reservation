import { useParams } from "react-router-dom";
import HistoryDetail from "~/pages/History/HistoryDetail";

import { useEffect, useState } from "react";
import { callGetCinema, callGetUserReservationId } from "~/services/api";

const HistoryPage = () => {
    const params = useParams()
    const id = params?.id;
    const [dataDetail, setDataDetail]  = useState({})
    useEffect(()=>{
        fetchDetailOrder()
    },[id])

    const fetchDetailOrder = async() => {
        const res = await callGetUserReservationId(id)
        if( res && res.success){
            setDataDetail(res.data)
        }
        
    }
    return ( 
        <>
            <HistoryDetail  dataDetail={dataDetail}/>            
        </>
     );
}
 
export default HistoryPage;