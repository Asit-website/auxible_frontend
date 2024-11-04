import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMain } from "../hooks/useMain"
import toast from 'react-hot-toast';

const AcceptPage = () => {

    const {acceptassetsapi} = useMain();

  const { userId } = useParams();

  const acceptassets = async(assetId)=>{
    const resp = await acceptassetsapi(assetId);
    toast.success("Successfuly Accpeted");
  }

  useEffect(() => {
   
     if(userId){
      acceptassets(userId);
     }
  }, [userId]);

  return (
    <div>
      <h1>Request Accepted</h1>
      <p>Your request has been processed.</p>
    </div>
  );
};

export default AcceptPage;
