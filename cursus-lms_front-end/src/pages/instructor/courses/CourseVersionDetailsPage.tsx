
import CourseVersionWall from "../../../components/instructor/services/courses/CourseVersionWall.tsx";
import SectionVersionTable from "../../../components/instructor/services/courses/SectionVersionTable.tsx";


const CourseVersionDetailsPage = () => {
    const query = new URLSearchParams(window.location.search);
    const courseVersionId: string | null = query.get('courseVersionId');
    return (
        <div className='mx-auto w-full'>
            <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Courses Version Details</h1>
            <CourseVersionWall courseVersionId={courseVersionId}></CourseVersionWall>
            <SectionVersionTable courseVersionId={courseVersionId}></SectionVersionTable>
        </div>
    );
};

export default CourseVersionDetailsPage;