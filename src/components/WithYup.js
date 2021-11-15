import {useFormik} from 'formik'
import * as Yup from 'yup';

// we require validationSchema 

const SampleFormYup = () => {
    const initialValues = {
        email: '',
        name: ''
    }

    const validationSchema = () => Yup.object({
        email: Yup.string().email("Invalid Format **").required("Required *"),
        name: Yup.string().required("Required *")
    })

    const onSubmit = (values) => {
        console.log("Form Submitted", values)
    }

    const formik = useFormik({
        initialValues: initialValues,
        // validate: validate,
        validationSchema,
        onSubmit
    })

    console.log("Form", formik); // Check in inpect ( Will get form values in object ) -- our initialValues are in values 

    return(
        <div>
            <form onSubmit={formik.handleSubmit}>
                <h1> Formik with Yup Validation </h1>
                <label htmlFor="email"> Email </label>
                <input type="email" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} 
                onBlur = {formik.handleBlur} /> 
                <p> {formik.touched.email && formik.errors.email ? formik.errors.email : ""} </p>

                {/* No event is required to handle the change value 
                In formik we are having handleChange as a direct function to trigger onChange value */}

                <label htmlFor="name"> Name </label>
                <input type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} 
                onBlur = {formik.handleBlur}/>
                <p> {formik.touched.name && formik.errors.name ? formik.errors.name : ""} </p>

                {/* name is mandatory in formik */}

                <button type="submit"> Submit </button>
                <p className="footer"> By Narasimha </p>
            </form>
        </div>
    )
    
}

export default SampleFormYup