import EmailEditor from "../../../../components/admin/services/emails/EmailEditor.tsx";
import EmailDetails from "../../../../components/admin/services/emails/EmailDetails.tsx";
import {PATH_ADMIN} from "../../../../routes/paths.ts";
import {useNavigate} from "react-router-dom";


const EmailTemplateEditPage = () => {
    const query = new URLSearchParams(window.location.search);
    const emailId: string | null = query.get('emailId');
    const navigate = useNavigate();
    return (
        <div className={'w-full'}>
            <div
                className='flex gap-2 text-3xl flex-row p-3 font-bold text-center rounded-md mb-8 text-green-800 border-2'>
                <button onClick={() => navigate(PATH_ADMIN.emails)} className="underline">Emails</button>
                <span>·</span>
                <button className="underline">Modify</button>
            </div>
            <div className="flex flex-col lg:flex-row justify-evenly items-center w-full">
                <div className="w-full md:w-4/12 mt-6">
                    <EmailDetails emailId={emailId}></EmailDetails>
                </div>
                <div className="w-full md:w-6/12 mt-6">
                    <EmailEditor emailId={emailId}></EmailEditor>
                </div>
            </div>
        </div>
    );
};

export default EmailTemplateEditPage;