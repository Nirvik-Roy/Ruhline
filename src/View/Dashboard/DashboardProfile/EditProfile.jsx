import React, { useState, useEffect } from 'react'
import Input from '../../../Components/Inputs/Input'
import countryData from '../../../../countries.json'
import upload from '../../../assets/Images/Vector (7).svg'
import Button from '../../../Components/Button/Button'
import { getCities, getCountries, getPhoneCountryCode, getStates } from '../../../utils/location'
import Loaders from '../../../Components/Loaders/Loaders'
import { editProfile, getUserProfile } from '../../../utils/user'
const EditProfile = () => {
    const [countries, setcountries] = useState([]);
    const [profileData, setProfiledata] = useState([]);
    const [editErrors, seteditErrors] = useState([]);
    const [contacterrorMessage, setContactErrorMessage] = useState();
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);
    const [postLoading,setpostLoading] = useState(false)
    const [countryId, setCountryId] = useState();
    const [stateId, setStateId] = useState()
    const [file, setFile] = useState()
    const [phone, setPhone] = useState([]);
    const [errors, setError] = useState();
    const [formData, setformData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        phone_country_code_id: '',
        address_line_1: '',
        address_line_2: '',
        landmark: '',
        country_id: '',
        state_id: '',
        city_id: '',
        postal_code: '',
    })

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                // Run calls in parallel
                const [countriesRes, phoneRes, profileRes] =
                    await Promise.all([
                        getCountries(),
                        getPhoneCountryCode(),
                        getUserProfile()
                    ]);
                // Set state once all are resolved
                setcountries(countriesRes);
                setPhone(phoneRes);
                setProfiledata(profileRes?.user)
                setCountryId(profileRes?.user?.profile?.country?.id)
                setStateId(profileRes?.user?.profile?.state?.id)

            } catch (err) {
                console.error("Error fetching profile data:", err);
                setError(err.message || "Something went wrong!");
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, []);


    useEffect(() => {
        if (profileData) {
            setformData({
                first_name: profileData?.first_name || '',
                last_name: profileData?.last_name || '',
                email: profileData?.email || '',
                phone: profileData?.profile?.phone || '',
                phone_country_code_id: profileData?.profile?.phone_country_code?.id || '',
                address_line_1: profileData?.profile?.address_line_1 || '',
                address_line_2: profileData?.profile?.address_line_2 || '',
                landmark: profileData?.profile?.landmark || '',
                country_id: profileData?.profile?.country?.id || '',
                state_id: profileData?.profile?.state?.id || '',
                city_id: profileData?.profile?.city?.id || '',
                postal_code: profileData?.profile?.postal_code || ''
            })
        }
       
    }, [profileData])
    
    const getStateFunc = async (id) => {
        setLoading(true)
        if (id) {
            try {
                const result = await getStates(id);
                setStates(result)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
    }
    useEffect(() => {
        if (countryId) {
            getStateFunc(countryId)
        }

        if (stateId) {
            getCityFunc(stateId)
        }
    }, [countryId, stateId])

    const getCityFunc = async (id) => {
        setLoading(true)
        if (id) {
            try {
                const result = await getCities(id);
                setCities(result)
            } catch (err) {
                console.log(err)
            } finally {
                setLoading(false)
            }
        }
    }
    const contactRegex = /^[0-9]{10}$/;

    const ValidateContact = (number) => {
        if (!number) {
            return setContactErrorMessage('* Contact Number is Required')
        }
        if (!contactRegex.test(number)) {
            return setContactErrorMessage('* Plz enter a 10 digit number')
        }
        return setContactErrorMessage('')
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        if(name === 'phone'){
            ValidateContact(value)
        }
        setformData({
            ...formData,
            [name]: value
        })
    }
    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async () => {
        setpostLoading(true);
        const { first_name, last_name, email, phone, phone_country_code_id, address_line_1, address_line_2, landmark, country_id, state_id, city_id, postal_code } = formData;
        try {
            console.log('no_profile_img')
            if (!formData?.profile?.profile_image && file) {
                const formDataNew = new FormData;
                formDataNew.append("first_name", first_name);
                formDataNew.append("last_name", last_name);
                formDataNew.append("email", email);
                formDataNew.append("phone", phone);
                formDataNew.append("phone_country_code_id", phone_country_code_id);
                formDataNew.append("address_line_1", address_line_1);
                formDataNew.append("address_line_2", address_line_2);
                formDataNew.append("landmark", landmark);
                formDataNew.append("country_id", country_id);
                formDataNew.append("state_id", state_id);
                formDataNew.append("city_id", city_id);
                formDataNew.append("postal_code", postal_code);
                formDataNew.append("profile_image", file);
                const result = await editProfile(formDataNew);
                seteditErrors(result?.errors)
            } else {
                console.log('Profile image')
                const data = {
                    first_name,
                    last_name,
                    email,
                    phone,
                    phone_country_code_id,
                    address_line_1,
                    address_line_2,
                    landmark,
                    country_id,
                    state_id,
                    city_id,
                    postal_code
                }
                const result = await editProfile(data);
                seteditErrors(result)
            }
        } catch (err) {
            console.log(err)
        } finally {
            setpostLoading(false)
        }
    }

    useState(() => {
        if (profileData?.profile?.country?.id != '') {
            getStateFunc(profileData?.profile?.country?.id)
        }
    }, [])
    return (
        <>
            {loading && <Loaders />}
            <div className='dashboard_content_wrapper'>
                <div className='schedule_program_head_wrapper' style={{
                    marginBottom: '30px'
                }}>
                    <div className='schedule_program_back_wrapper' style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: '100%',
                        flexWrap: 'wrap',
                        gap: '15px'
                    }}>
                        <div className='schedule_program_head'>
                            <h3 style={{
                                marginBottom: '0px',
                                fontSize: '25px'
                            }}>Edit Profile</h3>

                        </div>


                    </div>
                </div>

                <form className='confirm_form_wrapper'>
                    <div className='cofirm_form_grid_wrapper'>
                    <div>
                        <Input onChange={handleChange} value={formData.first_name} name={'first_name'} label={' First Name'} type={'text'} required={true} placeholder={'Enter first name'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.first_name && editErrors?.first_name[0]}</small>

                    </div>

                    <div>

                        <Input onChange={handleChange} value={formData.last_name} name={'last_name'} label={' Last Name'} type={'text'} required={true} placeholder={'Enter last name'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.last_name && editErrors?.last_name[0]}</small>
                    </div>
                        <Input readOnly={true} value={formData.email} name={'email'} label={'Email'} type={'email'} required={true} placeholder={'Enter email'} />
                        <div className='input_form confirm_input_form'>
                            <label>Phone <span>*</span></label>
                            <div className='phone_input_Wrapper656'>
                                <select name='phone_country_code_id' onChange={handleChange} value={formData.phone_country_code_id}>
                                    {phone?.map((e) => (
                                        <option value={e.id} key={e.id}>+{e.phone_code}</option>
                                    ))}

                                </select>
                                <input value={formData.phone} name='phone' onChange={handleChange} placeholder='Enter phone number' />

                            </div>

                                <small style={{
                                    fontSize: '0.7rem',
                                    display: 'block',
                                    marginTop: '5px',
                                    color: 'red'
                                }}>{editErrors?.phone ? editErrors?.phone[0] : contacterrorMessage}</small>
                        </div>
                    </div>

                    <h4 style={{
                        fontWeight: '600',
                        fontSize: '20px',
                        color: 'var(--text-color)',
                        margin: '30px 0'
                    }}>Address</h4>

                    <div className='cofirm_form_grid_wrapper'>
                    <div>
                        <Input onChange={handleChange} value={formData.address_line_1} name={'address_line_1'} label={'Address Line 1'} type={'text'} required={true} placeholder={'Enter address line 1'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.address_line_1 && editErrors?.address_line_1[0]}</small>
                    </div>
                    <div>
                        <Input onChange={handleChange} value={formData.address_line_2} name={'address_line_2'} label={'Address Line 2'} type={'text'} required={true} placeholder={'Enter address line 2'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.address_line_2 && editErrors?.address_line_2[0]}</small>
                    </div>
                    <div>
                        <Input onChange={handleChange} value={formData.landmark} name={'landmark'} label={'Landmark'} type={'text'} placeholder={'Enter landmark'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.landmark && editErrors?.landmark[0]}</small>
                    </div>

                        <div className='values_form_input_Wrapper edit_profile_input_wrapper'>
                            <label>Country<span>*</span></label>
                            <select name='country_id' onChange={((e) => {
                                getStateFunc(e.target.value)
                                handleChange(e)
                            })} value={formData.country_id}>
                                <option>--Select-country--</option>
                                {countries?.map((e) => (
                                    <option value={e.id} key={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{editErrors?.country_id && editErrors?.country_id[0]}</small>
                        </div>
                        <div className='values_form_input_Wrapper edit_profile_input_wrapper'>
                            <label>State<span>*</span></label>
                            <select name='state_id' onChange={((e) => {
                                getCityFunc(e.target.value);
                                handleChange(e)
                            })} value={formData.state_id}>
                                <option>--Select-state--</option>
                                {states?.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{editErrors?.state_id && editErrors?.state_id[0]}</small>
                        </div>
                        <div className='values_form_input_Wrapper edit_profile_input_wrapper'>
                            <label>City<span>*</span></label>
                            <select name='city_id' onChange={((e) => {

                                handleChange(e)
                            })} value={formData.city_id}>
                                <option>--Select-city--</option>
                                {cities?.map((e) => (
                                    <option value={e.id}>{e.name}</option>
                                ))}
                            </select>
                            <small style={{
                                fontSize: '0.7rem',
                                display: 'block',
                                marginTop: '5px',
                                color: 'red'
                            }}>{editErrors?.city_id && editErrors?.city_id[0]}</small>
                        </div>
                        <div>
                        <Input onChange={handleChange} value={formData.postal_code} name={'postal_code'} label={'Enter postal code'} type={'text'} required={true} placeholder={'1966'} />
                        <small style={{
                            fontSize: '0.7rem',
                            display: 'block',
                            marginTop: '5px',
                            color: 'red'
                        }}>{editErrors?.postal_code && editErrors?.postal_code[0]}</small>

                        </div>

                    </div>
                    <div className='values_form_input_Wrapper'>
                        <label style={{
                            fontSize: '18px',
                            fontWeight: '600'
                        }}>Upload Files<span>*</span></label>

                        <div className='files_upload_wrapper'>
                            {(!file && !profileData?.profile?.profile_image) && (
                                <>
                                    <img src={upload} alt="Upload Placeholder" />
                                    <p>Drag your files or <span>Browse</span></p>
                                    <h5>Png, Jpg, Jpeg supported | file size: 250 KB</h5>
                                </>
                            )}

                            {(!file && profileData?.profile?.profile_image) && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '90%',
                                        objectFit: 'contain',
                                    }}
                                    src={profileData.profile.profile_image}
                                    alt="Profile"
                                />
                            )}

                            {file && (
                                <img
                                    style={{
                                        width: '100%',
                                        height: '90%',
                                        objectFit: 'contain',
                                    }}
                                    src={URL.createObjectURL(file)}
                                    alt="Selected"
                                />
                            )}
                            <input onChange={handleFileChange} type='file' />
                        </div>
                    </div>
                    <small style={{
                        fontSize: '0.7rem',
                        display: 'block',
                        marginTop: '5px',
                        color: 'red'
                    }}>{editErrors?.profile_image && editErrors?.profile_image[0]}</small>

                    <div className='cancel_select_button_wrapper' style={{
                        marginTop: '30px'
                    }}>

                        <button onClick={((e)=>e.preventDefault())}>Cancel</button>
                        <div onClick={(() => handleSubmit())}>

                            <Button styles={{
                                width:'140px',
                                height:'50px'
                            }} loadingText='Adding..' loading={postLoading} children={'Add'} />
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default EditProfile
