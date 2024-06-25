import {useEffect, useState} from "react";
import useAuth from "../../hooks/useAuth.hook.ts";
import {IDegreeUploadDTO, RolesEnum} from "../../types/auth.types.ts";
import toast from "react-hot-toast";
import {PATH_PUBLIC} from "../../routes/paths.ts";
import {useNavigate} from "react-router-dom";

const UploadDegreeInstructor = () => {

    const [loading, setLoading] = useState<boolean>(false);
    const [File, setFile] = useState<File | null>(null);
    const [fileUrl, setFileUrl] = useState<string>('');
    const {uploadDegree, isAuthenticated, isFullInfo, user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated && user?.roles[0] != RolesEnum.INSTRUCTOR) {
            navigate(PATH_PUBLIC.home);
        }
    });

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
            setFileUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleUpload = async () => {
        try {
            setLoading(true);
            if (File !== null) {
                const uploadFile: IDegreeUploadDTO = {
                    File: File
                }
                await uploadDegree(uploadFile);
                setLoading(false);
                setFile(null);
            } else {
                setLoading(false);
                toast.error("No file chosen");
            }

        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong")
            console.log(error)
        }
    };

    return (
        <div
            className="flex w-8/12 mx-auto flex-col items-center justify-center mt-12 p-4 bg-gray-100 rounded-lg shadow-md">
            <h1 className={'text-center text-wrap text-2xl mb-4 text-green-800'}>
                {isFullInfo ? 'As a Instructor, you need to upload your degree!' : 'Your degree will be approval soon by admin'}
            </h1>
            <div className="mb-4">
                <label htmlFor="file" className="sr-only">
                    Choose a file
                </label>
                <input
                    id="file"
                    type="file"
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    onChange={handleFileChange}
                />
            </div>
            {File && (
                <section className="mb-4 p-4 bg-white rounded-lg shadow-inner">
                    <h3 className="text-lg font-semibold mb-2">File details:</h3>
                    <ul className="list-disc list-inside text-sm">
                        <li><strong>Name:</strong> {File.name}</li>
                        <li><strong>Type:</strong> {File.type}</li>
                        <li><strong>Size:</strong> {File.size} bytes</li>
                        <img src={fileUrl}/>
                    </ul>
                </section>
            )}
            {File && (
                <button
                    type="button"
                    className={`mt-4 px-4 py-2 rounded-full text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} transition duration-200 ease-in-out`}
                    onClick={handleUpload}
                    disabled={loading}
                >
                    {loading ? 'Uploading...' : 'Upload'}
                </button>
            )}
        </div>
    );
};

export default UploadDegreeInstructor;