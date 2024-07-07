import DetailsVersionTable from "../../../components/instructor/services/courses/DetailsVersionTable.tsx";

const SectionVersionDetailsPage = () => {
    const query = new URLSearchParams(window.location.search);
    const sectionVersionId: string | null = query.get('sectionVersionId');

    return (
        <div className='mx-auto w-full'>
            <DetailsVersionTable sectionVersionId={sectionVersionId}></DetailsVersionTable>
        </div>
    );
};

export default SectionVersionDetailsPage;