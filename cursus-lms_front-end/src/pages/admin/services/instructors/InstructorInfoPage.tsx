import InstructorComment from "../../../../components/admin/services/instructors/InstructorComment.tsx";
import InstructorDetails from "../../../../components/admin/services/instructors/InstructorDetails.tsx";
// import {PATH_ADMIN} from "../../../../routes/paths.ts";
// import {useNavigate} from "react-router-dom";
// import {Button} from "@material-tailwind/react";


const InstructorInfoPage = () => {
    const query = new URLSearchParams(window.location.search);
    const instructorId: string | null = query.get('instructorId');
    // const navigate = useNavigate();
    return (
        <div className={'w-full'}>
            {/*<div>*/}
            {/*    <Button className={'bg-green-800 py-2'} onClick={() => navigate(PATH_ADMIN.instructors)}*/}
            {/*            placeholder={undefined} onPointerEnterCapture={undefined}*/}
            {/*            onPointerLeaveCapture={undefined}> Back</Button>*/}
            {/*</div>*/}
            <div>
                <InstructorDetails instructorId={instructorId}></InstructorDetails>
            </div>
            <div className={'max-w-full'}>
                <InstructorComment instructorId={instructorId}></InstructorComment>
            </div>
        </div>
    );
};

export default InstructorInfoPage;