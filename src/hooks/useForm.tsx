import { Controller } from "react-hook-form";
import { EnumProps } from "../utils/types";

type InputProps = {
    bind: any,
    control: any,
    other?: Object | null,
    format?: string,
    label?: string,
    enums?: EnumProps[]
}

type FormProps = {
    bind: any,
    select?: boolean,
    date?: boolean,
    file?: boolean,
    control?: any,
    format?: string | undefined,
    label?: string | undefined,
    enums?: EnumProps[] | undefined,
    other?: any | undefined,
}

const UseFormGroup = ({ bind, select, date, file, control, ...other }:FormProps) => {
    return (
        <>
            <InputText bind={bind} control={control} {...other}/>
        </>
    )
};

const InputText = ({ bind, control }:InputProps) => {
    return (
        <Controller
            {...bind.bindHookForm}
            control={control}
            className="form-text no-underline"
            render={({ field }) => <input {...field} {...bind.bindInput} />}
        />
    )
}

const InputDate = ({ bind, format, label }:InputProps) => {
    return (
            <input {...bind.bindHookForm}
            label={label}
            value={bind.value}
            type="date"
            className="form-date"
            inputFormat={format}
            onChange={v => bind.setValue(v)}/>
    )
}

const InputSelect = ({ bind, control, enums }:InputProps) => {
    return (
        <Controller
            id="demo-simple-select-standard"
            {...bind.bindHookForm}
            control={control}
            render={({ field }) => 
                <select {...field} {...bind.bindInput} className="form-select">
                    {
                        enums?.map((v, i) => {
                            return (
                                <option key={i} value={v.value}>{v.display}</option>
                            )
                        })
                    }
                </select>
            }
        />
    )
}

export default UseFormGroup