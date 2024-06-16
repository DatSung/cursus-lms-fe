import CategoriesTable from "../../../../components/admin/services/categories/CategoriesTable.tsx";

const CategoriesPage = () => {
    return (
        <div className='mx-auto w-full'>
            <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Categories Page</h1>
            <CategoriesTable></CategoriesTable>
        </div>
    );
};

export default CategoriesPage;