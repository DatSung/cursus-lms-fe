import CourseVersionsTable from "../../../components/instructor/services/courses/CourseVersionsTable.tsx";

const InstructorCourseVersionsPage = () => {
    const query = new URLSearchParams(window.location.search);
    const courseId: string | null = query.get('courseId');
    return (
        <div className='mx-auto w-full'>
            <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Course Versions Page</h1>
            <CourseVersionsTable courseId={courseId}></CourseVersionsTable>
        </div>
    );
};

export default InstructorCourseVersionsPage;