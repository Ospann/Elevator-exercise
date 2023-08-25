/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import styled from "styled-components";
import { useForm, UseFormReturn } from "react-hook-form";

interface FormData {
    lifts: number;
    floors: number;
}

interface InputFormProps {
    onSubmit: any;
    register: UseFormReturn<FormData>["register"];
}

const FormContainer = styled.div`
    position: absolute;
    top: 2rem;
    right: 2rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid orange;
    border-radius: 50%;
    padding: 2.5rem;
    background-color: yellow;
`;

const FormGroup = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    font-weight: bold;
`;

const Input = styled.input`
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
`;

const SubmitButton = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

const InputForm: React.FC<InputFormProps> = ({ onSubmit, register }) => {
    const { handleSubmit, formState: { errors } } = useForm<FormData>();

    const handleFormSubmit = (data: FormData) => onSubmit(data);

    return (
        <FormContainer>
            <FormGroup>
                <Label htmlFor="lifts">Lifts:</Label>
                <Input
                    id="lifts"
                    type="number"
                    placeholder="1"
                    required
                    pattern="[0-9]*"
                    {...register("lifts", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Only numbers are allowed"
                        }
                    })}
                />
                {errors.lifts && <p>{errors.lifts.message}</p>}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="floors">Floors:</Label>
                <Input
                    id="floors"
                    type="number"
                    placeholder="8"
                    required
                    pattern="[0-9]*"
                    {...register("floors", {
                        pattern: {
                            value: /^[0-9]*$/,
                            message: "Only numbers are allowed"
                        }
                    })}
                />
                {errors.floors && <p>{errors.floors.message}</p>}
            </FormGroup>
            <SubmitButton onClick={handleSubmit(handleFormSubmit)}>Submit</SubmitButton>
        </FormContainer>
    );
};

export default InputForm;
