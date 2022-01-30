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
    phone?: boolean,
    select?: boolean,
    date?: boolean,
    number?: boolean,
    css?: string | null,
    file?: boolean,
    control?: any,
    format?: string | undefined,
    label?: string | undefined,
    enums?: EnumProps[] | undefined,
    other?: any | undefined,
}

const UseFormGroup = ({ bind, phone, select, date, number, file, control, css, ...other }:FormProps) => {
    return (
        <>
        {/* // <FormControl className={`${css ? `${css}` : "mt-5 w-100"}`}> */}
            {
                phone  ?  <InputPhone bind={bind} control={control} /> :
                select ?  <InputSelect bind={bind} control={control} {...other} /> :
                date   ?  <InputDate bind={bind} control={control} {...other} /> :
                number ?  <InputNumber bind={bind} control={control} {...other} />
                       :  <InputText bind={bind} control={control} />
            }
        {/* // </FormControl> */}
        </>
    )
};

const InputPhone = ({ bind, control }:InputProps) => {
    return (
        <Controller
            {...bind.bindHookForm}
            country={'fr'}
            onlyCountries={['fr', 're', 'be', 'yt', 'gf', 'pf', 'tf', 'mu']}
            control={control}
            className="form-tel"
            render={({ field }) => <input {...field} {...bind.bindInput} />}
        />
    )
}

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

const InputNumber = ({ bind, control, ...other }:InputProps) => {
    return (
        <Controller
            {...bind.bindHookForm}
            {...other}
            control={control}
            className="form-number"
            render={({ field }) => <input {...field} autoComplete='off' {...bind.bindInput} />}
        />
    )
}

// const InputFile = ({ bind, control }) => {
//     return (
//         <Controller
//             control={control}
//             render={({ field }) => <InputFileBrowser value={bind.value} set={bind.setValue} {...field} {...bind.bindInput} />}
//         />
//     )
// }

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