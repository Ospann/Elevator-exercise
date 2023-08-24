import React from "react";
import { useForm, SubmitHandler, UseFormReturn } from "react-hook-form";

interface FormData {
    lifts: string;
    floors: string;
}

interface InputFormProps {
    onSubmit: SubmitHandler<FormData>;
    register: UseFormReturn<FormData>["register"];
}

const InputForm: React.FC<InputFormProps> = ({ onSubmit, register }) => {
    const { handleSubmit } = useForm<FormData>();

    const handleFormSubmit = (data: FormData) => {
        const newData = {
            ...data,
            lifts: parseInt(data.lifts, 10),
            floors: parseInt(data.floors, 10)
        };
        onSubmit(newData);
    };

    return (
        <div>
            <div>
                <label>
                    Lifts:
                    <input
                        name="lifts"
                        type="number"
                        required
                        {...register("lifts", { defaultValue: 1 })}
                    />
                </label>
            </div>
            <div>
                <label>
                    Floors:
                    <input
                        name="floors"
                        type="number"
                        required
                        {...register("floors", { defaultValue: 8 })}
                    />
                </label>
            </div>
            <button onClick={handleSubmit(handleFormSubmit)}>Submit</button>
        </div>
    );
};

export default InputForm;
