interface IProps {
    variant: 'primary' | 'secondary' | 'danger' | 'light';
    type: 'submit' | 'button';
    label: any;
    onClick?: () => void;
    loading?: boolean;
    disabled?: boolean;
}

const Button = ({variant, type, label, onClick, loading, disabled}: IProps) => {

    const primaryClasses = ' text-white bg-green-800';
    const secondaryClasses = ' text-black bg-gray-200';
    const dangerClasses = ' text-white bg-[#AE899A]';
    const lightClasses = ' text-green-700 border border-green-700';

    const classNameCreator = (): string => {
        let finalClassName = 'hover:opacity-50 flex justify-center items-center outline-none duration-300 h-8 px-4 rounded w-full text-nowrap';

        if (variant === 'primary') {
            finalClassName += primaryClasses;
        } else if (variant === 'secondary') {
            finalClassName += secondaryClasses;
        } else if (variant === 'danger') {
            finalClassName += dangerClasses;
        } else if (variant === 'light') {
            finalClassName += lightClasses
        }

        finalClassName += ' disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300';

        return finalClassName;
    }

    const loadingIconCreator = () => {
        return <div className='w-6 h-6 rounded-full animate-spin border-2 border-gray-400 border-t-gray-800'></div>
    }

    return (
        <button
            type={type}
            onClick={onClick}
            className={classNameCreator()}
            disabled={disabled}
        >
            {loading ? loadingIconCreator() : label}
        </button>
    )
};

export default Button;