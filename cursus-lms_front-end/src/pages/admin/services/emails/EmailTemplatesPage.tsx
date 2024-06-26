import EmailsTable from "../../../../components/admin/services/emails/EmailsTable.tsx";

const EmailTemplatesPage = () => {
    return (
        <div className="w-full flex justify-center">
            <div className={'w-full'}>
                <h1 className="text-3xl p-3 font-bold text-center mb-8 text-green-800 border-2">Email Templates
                    Page</h1>
                <EmailsTable></EmailsTable>
            </div>
        </div>
    );
};

export default EmailTemplatesPage;