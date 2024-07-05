import CoursesTable from "../../../components/instructor/services/courses/CoursesTable.tsx";


const InstructorCoursesPage = () => {
    return (
        <div className='mx-auto w-full'>
            <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Courses Page</h1>
            <CoursesTable></CoursesTable>
        </div>
    );
};

export default InstructorCoursesPage;