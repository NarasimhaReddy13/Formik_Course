// Using 4 main components ---- Formik, Form, Field, ErrorMessage *****

import { Formik, Form, Field, ErrorMessage, FieldArray, FastField } from 'formik'
import * as Yup from 'yup';

import ShowError from './ShowError'

const FeedbackFormWith4Components = () => {
    const initialValues = {
        email: '',
        phone: '',
        fatherName: '',
        address: '',
        

        // nested objects 
        socialmedia: {
            facebook: '',
            linkedin: ''
        },

        //Arrays
        mobileNumbers: ['', ''],



        // Field Array
        phoneNumbers: ['']
    }

    // Field-level validations (Individual validations)
    const validateFathername = (value) => {
        let error;

        if (!value) {
            error = "Required ***";
        }
        return error
    }
    // Till here inidividual validation


    const validationSchema = () => Yup.object({
        email: Yup.string().email("Invalid Format **").required("Required *"),
        phone: Yup.number().required('Required *'),
        // fatherName: Yup.string().required("Required **")

        socialmedia: Yup.object({
            facebook: Yup.string().required("Facebook Required **")
        }),

        address: Yup.string().required("Required Address*"),

        // Array Validations
        mobileNumbers: Yup.array().required("Required Mobile Numbers"),

        // FieldArray 
        phoneNumbers: Yup.array().required("Required Some Phone numbers")
    })

    const onSubmit = (values, form) => {
        console.log("Form Submitted", values, form);

        setTimeout(() => {
            form.setSubmitting(false);
        }, 2000)

    }

    return(
        <div>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnMount>
                { (formik) => {
                    console.log("form", formik.errors);
                    return (
                        <Form>
                            <h1> Formik First Page </h1>
                            <label htmlFor="email"> Email </label>
                            <Field type="email" name="email" id="email"/> 
                            <ErrorMessage name="email" component={ShowError}/>
        
        
                            {/* No event is required to handle the change value 
                            In formik we are having handleChange as a direct function to trigger onChange value */}
        
        
                            {/* name is mandatory in formik */}
        
        
                            <label htmlFor="phone"> Mobile Number </label>
                            <Field type="text" name="phone" id="phone" placeholder="Enter mobile number" />
                            {/* <Field type="text" name="phone" id="phone" as="select"  as="textarea"/> */}
                            <ErrorMessage name="phone" component={ShowError}/>
        
        
        
                            {/* Field level validation -- example */}
                            <label htmlFor="fatherName"> Father Name </label>
                            <Field type="text" name="fatherName" id="fatherName" validate={validateFathername}/>
                            <ErrorMessage name="fatherName" component={ShowError}/>
        
        
        
                            {/* Render Props Example -- reusuable pattern*/}
                            <label htmlFor="address"> Address </label>
                            <FastField name="address" id="address">
                                {
                                    (props) => {
                                        // console.log("Address Props", props);   // Verify in console once (field -- onBlur etc events related to input, form -- Total form methods,  meta -- errors)
                                        console.log("Address Props");
        
        
                                        const {meta, field} = props;
                                        return <textarea {...field} ></textarea>
                                    }
                                }
                            </FastField>
                            <ErrorMessage name="address" component={ShowError}/>
        
        
        
                            
                            <label htmlFor="facebook"> Facebook ID </label>
                            <Field type="text" name="socialmedia.facebook" id="facebook" />
                            <ErrorMessage name="socialmedia.facebook" component={ShowError}/>
        
        
        
                            <label htmlFor="mobile1"> First Mobile Numbers </label>
                            <Field type="text" name="mobileNumbers[0]" id="mobile1" />
                            <ErrorMessage name="mobileNumbers[0]" component={ShowError}/>
        
        
        
                            {/* Field Array Example */}
                            <label htmlFor="phoneNumbers"> Your Phone Numbers </label>
                            <FieldArray name="phoneNumbers">
                                {
                                    (fieldArgs) => {
                                        // console.log(fieldArgs);
        
                                        const {form, push, remove} = fieldArgs;
                                        const {values} = form;
                                        const {phoneNumbers} = values;
        
                                        return (
                                            <div>
                                                {phoneNumbers.map((phoneNumber, index) => (
                                                    <div key={index}>
                                                        <Field name={`phoneNumbers[${index}]`} />
                                                        {phoneNumbers.length > 1 && <button onClick={() => remove(index)}> - </button> }
                                                        <button onClick={() => push('')}> + </button>
                                                    </div>
                                                ))}
                                                
                                            </div>
                                        )
                                    }
                                }
                            </FieldArray>
        
        
        
        
                            Manual Triggering -- for validation 
        
                            <button type="button" onClick={() => formik.validateForm()}> Validate Form </button>
                            <button type="button" onClick={() => formik.setFieldTouched("email")}> Touch Element </button>
                            <button type="button" onClick={() => formik.setTouched({
                                email: true
                            })}> Touch Form </button>

                            <button type="button" onClick={() => formik.validateField("email")}> Validate Element </button>



                            Disabling Submit button **** ---- 5 cases (When we are making some api calls to disable that for further click)

                            {/* <button type="submit" className="submitBtn" disabled={ !(formik.dirty && formik.isValid)}> Submit </button> */}

                            <button type="submit" className="submitBtn" disabled={formik.isSubmitting}> Submit </button>
                            <p className="footer"> By Narasimha </p>


                            Disabling on Page load. -- adding validateOnMount in Formik 

                            By adding dirty --- Submit button will be enabled only after entering mandatory fields.

                            pre-populating based on default data

                            While Form submission is in progress ***** -- doing in onSubmit  (In submit button also - check)
                        </Form>
                    )
                }}

            </Formik>
        </div>
    )
    
}

export default FeedbackFormWith4Components


// we can restrict the validations --- by
/* 
validateOnChange={false}      --- adding this in formik
validateOnBlur={false}
*/