import InstructorComment from "../../../../../components/admin/users/instructors/InstructorComment.tsx";
import InstructorDetails from "../../../../../components/admin/users/instructors/InstructorDetails.tsx";
import {PATH_ADMIN} from "../../../../../routes/paths.ts";
import {useNavigate} from "react-router-dom";


const InstructorInfoPage = () => {
    const query = new URLSearchParams(window.location.search);
    const instructorId: string | null = query.get('instructorId');
    const navigate = useNavigate();
    return (
        <div className={'w-full'}>
            <div
                className='flex gap-2 text-3xl flex-row p-3 font-bold text-center rounded-md mb-8 text-green-800 border-2'>
                <button onClick={() => navigate(PATH_ADMIN.instructors)} className="underline">Instructors</button>
                <span>·</span>
                <button className="underline">Details</button>
            </div>
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