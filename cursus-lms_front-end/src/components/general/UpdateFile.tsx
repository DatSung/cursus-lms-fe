import { Control, Controller } from "react-hook-form";

interface IPros {
    control: Control<any, any>;
    label?: string;
    inputName: string;
    inputType?: string;
    value?: string;
    error?: string;
}

const UpdateField = ({ control, inputName, inputType, error, label }: IPros) => {

    const renderTopRow = () => {
        if (error) {
            return <span className="text-red-600 font-semibold">{error}</span>;
        }
        if (label) {
            return <label className="font-semibold">{label}</label>;
        }
        return null;
    };

    const baseClassName =
        "p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6";
    const dynamicClassName = `${baseClassName} ${
        error ? "border-red-600 rounded-lg" : "border-[#754eb477]"
    }`;


    return (
        <div>

            {renderTopRow()}

            <Controller
                name={inputName}
                control={control}
                render={
                    ({ field }) =>
                        <input
                            {...field}
                            autoComplete='off'
                            type={inputType}
                            className={dynamicClassName}
                        />
                }
            />

        </div>
    );
};

export default UpdateField;