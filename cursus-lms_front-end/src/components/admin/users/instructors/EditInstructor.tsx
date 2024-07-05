import {useState} from "react";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {IEditInstructorInfoDTO, IInstructorInfoDTO} from "../../../../types/instructor.types.ts";
import SelectField from "../../../general/SelectField.tsx";
import Button from "../../../general/Button.tsx";
import UpdateFile from "../../../general/UpdateFile.tsx";
import axiosInstance from "../../../../utils/axios/axiosInstance.ts";
import {IResponseDTO} from "../../../../types/auth.types.ts";
import {INSTRUCTORS_URL} from "../../../../utils/apiUrl/instructorApiUrl.ts";
import toast from "react-hot-toast";

interface IProps {
    instructorInfo: IInstructorInfoDTO;
    cancelEdit: () => void
}

const EditInstructor = (props: IProps) => {
    const [loading, setLoading] = useState<boolean>(false);

    const signUpSchema = Yup.object().shape({
        instructorId: Yup.string().required(),
        introduction: Yup.string().required("Introduction is required"),
        fullName: Yup.string().required("Full Name is required"),
        email: Yup.string().required("Email is required"),
        phoneNumber: Yup.string().required("Phone Number is required"),
        gender: Yup.string().required("Gender is required"),
        birthDate: Yup.date().required("BirthDate is required"),
        country: Yup.string().required("Country is required"),
        address: Yup.string().required("Address is required"),
        degree: Yup.string().required("Degree is required"),
        industry: Yup.string().required("Industry is required"),
        taxNumber: Yup.string().required("Tax number is required"),
    })

    const {
        control,
        handleSubmit,
        formState: {errors},
    } = useForm<IEditInstructorInfoDTO>({

        resolver: yupResolver(signUpSchema),

        defaultValues: {
            instructorId: props.instructorInfo.instructorId,
            email: props.instructorInfo.email,
            address: props.instructorInfo.address,
            fullName: props.instructorInfo.fullName,
            country: props.instructorInfo.country,
            gender: props.instructorInfo.gender,
            degree: props.instructorInfo.degree,
            industry: props.instructorInfo.industry,
            introduction: props.instructorInfo.introduction,
            taxNumber: props.instructorInfo.taxNumber,
            birthDate: props.instructorInfo.birthDate,
            phoneNumber: props.instructorInfo.phoneNumber,
        }
    });

    const onSubmitEditForm = async (data: IEditInstructorInfoDTO) => {
        setLoading(true)
        // Chuyển đổi giá trị ngày thành đối tượng Date
        const birthDate = new Date(data.birthDate);

        // Cộng 1 ngày
        birthDate.setDate(birthDate.getDate() + 1);

        // Thiết lập thời gian thành 12:00:00 để tránh vấn đề múi giờ
        birthDate.setUTCHours(12, 0, 0, 0);

        // Chuyển đổi ngày thành chuỗi ISO 8601 (YYYY-MM-DD)
        const formattedDate = birthDate.toISOString().split('T')[0];

        // Cập nhật lại dữ liệu với ngày đã chỉnh sửa
        const updatedData = {...data, birthDate: formattedDate};
        const response = await axiosInstance.put<IResponseDTO<string>>(INSTRUCTORS_URL.GET_PUT_INSTRUCTOR_URL(''), updatedData);
        if (response.data.statusCode === 200) {
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
        setLoading(false);
        props.cancelEdit();
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitEditForm)}
            className="space-y-2 w-full"
            action="#"
            method="POST"
        >

            <UpdateFile
                control={control}
                label='Introduction'
                inputName='introduction'
                error={errors.introduction?.message}
                value={props.instructorInfo.introduction}
            />

            <UpdateFile
                control={control}
                label='Full Name'
                inputName='fullName'
                error={errors.fullName?.message}
                value={props.instructorInfo.fullName}
            />

            <SelectField
                control={control}
                inputName="gender"
                label="Gender"
                error={errors.gender?.message}
                options={[
                    {value: "Male", label: "Male"},
                    {value: "Female", label: "Female"},
                ]}
            />

            <UpdateFile
                control={control}
                label='Birth Date'
                inputName='birthDate'
                inputType='date'
                error={errors.birthDate?.message}
            />

            <UpdateFile
                control={control}
                label='Country'
                inputName='country'
                error={errors.country?.message}
                value={props.instructorInfo.country}
            />

            <UpdateFile
                control={control}
                label='Address'
                inputName='address'
                error={errors.address?.message}
                value={props.instructorInfo.address}
            />

            <UpdateFile
                control={control}
                label='Industry'
                inputName='industry'
                error={errors.industry?.message}
                value={props.instructorInfo.industry}
            />

            <UpdateFile
                control={control}
                label='Degree'
                inputName='degree'
                error={errors.degree?.message}
                value={props.instructorInfo.degree}
            />

            <div className='flex items-center justify-center gap-8 p-4'>
                <Button
                    variant='secondary'
                    type='button'
                    label='Cancel'
                    onClick={props.cancelEdit}
                />
                <Button
                    variant='primary'
                    type='submit'
                    label='Save'
                    onClick={() => {
                        // Do nothing
                    }}
                    loading={loading}
                />
            </div>

        </form>
    );
};

export default EditInstructor;