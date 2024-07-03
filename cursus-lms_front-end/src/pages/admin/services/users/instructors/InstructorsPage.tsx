import InstructorsTable from "../../../../../components/admin/users/instructors/InstructorsTable.tsx";

const InstructorsPage = () => {
    return (
        <div className='mx-auto w-full'>
            <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Instructors Page</h1>
            <InstructorsTable></InstructorsTable>
        </div>
    );
};

export default InstructorsPage;