import {useState} from 'react';
import Swal from 'sweetalert2';
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";

const ExportInstructor = () => {
    const [month, setMonth] = useState<number>(1);
    const [year, setYear] = useState<number>(2020);

    const handleExport = async () => {
        const {value: formValues} = await Swal.fire({
            title: 'Choose month and year',
            html:
                `<input id="swal-input1" class="swal2-input" placeholder="Month" type="number" min="1" max="12">` +
                `<input id="swal-input2" class="swal2-input" placeholder="Year" type="number" min="2020" max="2050">`,
            focusConfirm: false,
            preConfirm: () => {
                const month = (document.getElementById('swal-input1') as HTMLInputElement).value;
                const year = (document.getElementById('swal-input2') as HTMLInputElement).value;

                return {month: month, year: year};
            }
        });

        if (formValues && formValues.month && formValues.year) {
            setMonth(parseInt(formValues.month) + 1);
            setYear(formValues.year);
            await axiosInstance.post(INSTRUCTORS_URL.EXPORT_INSTRUCTORS_URL(month, year));
            Swal.fire({
                icon: 'success',
                title: 'Exporting',
                text: `Auto download after finish`,
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mb-4">

            <div className="flex flex-col items-center">
                <button
                    className="px-4 py-2 bg-green-500 text-white rounded"
                    onClick={handleExport}
                >
                    Export
                </button>
            </div>

        </div>
    );
};

export default ExportInstructor;
