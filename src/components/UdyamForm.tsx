import React, { useState } from 'react';
import logo from '../assets/MINISTRY_NAME.webp'
const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const schema = {
  "step1": {
    "title": "Aadhaar Verification With OTP",
    "fields": [
      { "label": "1. Aadhaar Number/ आधार संख्या", "name": "ctl00$ContentPlaceHolder1$txtadharno", "id": "ctl00_ContentPlaceHolder1_txtadharno", "type": "text", "maxLength": 12, "placeholder": "Your Aadhaar No", "validation": { "required": true, "isNumber": true, "minLength": 12, "maxLength": 12 } },
      { "label": "2. Name of Entrepreneur / उद्यमी का नाम", "name": "ctl00$ContentPlaceHolder1$txtownername", "id": "ctl00_ContentPlaceHolder1_txtownername", "type": "text", "maxLength": 100, "placeholder": "Name as per Aadhaar", "validation": { "required": true } },
      { "label": "I, the holder of the above Aadhaar, hereby give my consent to Ministry of MSME, Government of India, for using my Aadhaar number as alloted by UIDAI for Udyam Registration. NIC / Ministry of MSME, Government of India, have informed me that my aadhaar data will not be stored/shared. / मैं, आधार धारक, इस प्रकार उद्यम पंजीकरण के लिए यूआईडीएआई के साथ अपने आधार संख्या का उपयोग करने के लिए सू0ल0म0उ0 मंत्रालय, भारत सरकार को अपनी सहमति देता हूं। एनआईसी / सू0ल0म0उ0 मंत्रालय, भारत सरकार ने मुझे सूचित किया है कि मेरा आधार डेटा संग्रहीत / साझा नहीं किया जाएगा।", "id": "declaration", "type": "checkbox", "validation": { "required": true } },
      { "label": "Validate & Generate OTP", "id": "ctl00_ContentPlaceHolder1_btnValidateAadhaar", "type": "button", "action": "generate_otp" },
      { "label": "OTP", "id": "ctl00_ContentPlaceHolder1_txtOtp1", "type": "text", "maxLength": 6, "placeholder": "OTP code", "validation": { "required": true, "isNumber": true, "minLength": 6, "maxLength": 6 }, "condition": { "action": "generate_otp" } },
      { "label": "Validate OTP", "id": "ctl00_ContentPlaceHolder1_btnValidate", "type": "button", "action": "validate_otp", "condition": { "action": "generate_otp" } }
    ]
  },
  "step2": {
    "title": "PAN Validation",
    "fields": [
      { "label": "Type of Organisation", "id": "ctl00_ContentPlaceHolder1_ddlTypeofOrg", "type": "dropdown", "options": ["Proprietary", "Partnership", "Co-Operative", "Private Limited Company", "Public Limited Company", "Self Help Group", "Limited Liability Partnership", "Society/Club/Trust", "Other"], "validation": { "required": true } },
      { "label": "PAN", "id": "ctl00_ContentPlaceHolder1_txtPan", "type": "text", "maxLength": 10, "placeholder": "Enter Pan Number", "validation": { "required": true, "pattern": "[A-Z]{5}[0-9]{4}[A-Z]{1}" } },
      { "label": "I agree to the terms and conditions.", "id": "ctl00_ContentPlaceHolder1_chkDecarationP", "type": "checkbox", "validation": { "required": true } },
      { "label": "PAN Validate", "id": "ctl00_ContentPlaceHolder1_btnValidatePan", "type": "button", "action": "validate_pan" }
    ]
  }
};

type Field = { label: string; id: string; type: string; name?: string; placeholder?: string; options?: string[]; validation: { required?: boolean; pattern?: string; minLength?: number; maxLength?: number; isNumber?: boolean; }; condition?: { action: string; }; action?: string; };
type StepSchema = { title: string; fields: Field[]; };
type Schema = { step1: StepSchema; step2: StepSchema; };


const FormField: React.FC<{ field: Field; value: string; onChange: (id: string, value: string) => void; error: string | null; onClick?: (action: string) => void; isDisabled?: boolean; }> = ({ field, value, onChange, error, onClick, isDisabled }) => {
  const renderField = () => {
    switch (field.type) {
      case 'text': return <input type="text" id={field.id} placeholder={field.placeholder} value={value} onChange={(e) => onChange(field.id, e.target.value)} maxLength={field.validation.maxLength} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />;
      case 'dropdown': return <select id={field.id} value={value} onChange={(e) => onChange(field.id, e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"> <option value="">Select an option</option> {field.options?.map(o => <option key={o} value={o}>{o}</option>)} </select>;
      case 'checkbox': return <div className="flex items-start gap-3"> <input type="checkbox" id={field.id} checked={!!value} onChange={(e) => onChange(field.id, e.target.checked ? 'true' : '')} className="h-5 w-5 mt-1 text-blue-600 border-gray-300 rounded focus:ring-blue-500" /> <label htmlFor={field.id} className="text-gray-600 text-sm">{field.label}</label> </div>;
      case 'button': return <button type="button" onClick={() => onClick?.(field.action || '')} disabled={isDisabled} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"> {field.label} </button>;
      default: return null;
    }
  };
  return <div className="mb-4"> {field.type !== 'checkbox' && <label htmlFor={field.id} className="block text-gray-700 font-medium mb-1">{field.label}</label>} {renderField()} {error && <p className="text-red-500 text-xs mt-1">{error}</p>} </div>;
};


const Header = () => (
 <header className=" bg-[#4638c7] shadow-md">
 <div className="container mx-auto px-4 py-3">
 <div className="flex justify-between items-center px-20">
 <div className="flex items-center gap-3">
 <img src={logo} alt="Emblem of India" className="h-12"/>
 </div>
 <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-white">
 <a href="#" className="hover:text-gray-300 transition-colors">Home</a>
 <a href="#" className="hover:text-gray-300 transition-colors">NIC Code</a>
 <a href="#" className="hover:text-gray-300 transition-colors">Useful Documents</a>
 <a href="#" className="hover:text-gray-300 transition-colors">Print / Verify</a>
 <a href="#" className="hover:text-gray-300 transition-colors">Update Details</a>
 <a href="#" className="bg-white text-[#4638c7] font-semibold px-4 py-2 rounded-md hover:bg-gray-200 transition-colors">Login</a>
 </nav>
 <div className="md:hidden text-white">
 <MenuIcon />
 </div>
 </div>
 </div>
 </header>
);


const Footer = () => (
    <footer className="bg-gray-800 text-white pt-10 pb-6">
        <div className="container mx-auto px-20 sm:px-20 grid md:grid-cols-3 gap-8">
            <div>
                <h3 className="font-bold text-lg mb-3">UDYAM REGISTRATION</h3>
                <p className="text-sm text-gray-400 mb-2">Ministry of MSME</p>
                <p className="text-sm text-gray-400 mb-4">Udyog Bhawan - New Delhi</p>
                <p className="text-sm text-gray-400">Email: <a href="mailto:champions@gov.in" className="hover:underline">champions@gov.in</a></p>
                <p className="text-sm text-gray-400 mt-4 font-bold">Contact Us</p>
                <p className="text-sm text-gray-400">For Grievances / Problems</p>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-3">Our Services</h3>
                <ul className="space-y-2 text-sm">
                    <li><a href="#" className="text-gray-400 hover:text-white">&gt; CHAMPIONS</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">&gt; MSME Samadhaan</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">&gt; MSME Sambandh</a></li>
                    <li><a href="#" className="text-gray-400 hover:text-white">&gt; MSME Dashboard</a></li>
                </ul>
            </div>
            <div>
                <h3 className="font-bold text-lg mb-3">Video</h3>
                <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
                    <p className="text-gray-500">Video Player Placeholder</p>
                </div>
            </div>
        </div>
        <div className="text-center text-xs text-gray-500 mt-10 border-t border-gray-700 pt-4">
            © Copyright Udyam Registration. All Rights Reserved.
        </div>
    </footer>
);


const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
    const steps = ["Aadhaar Validation", "PAN Validation"];

    return (
        <div className="w-full max-w-md mx-auto px-4 sm:px-0 mb-12">
            <div className="relative">
                <div className="absolute top-5 left-0 w-full h-0.5 bg-gray-300"></div>
                

                <div 
                    className="absolute top-5 left-0 h-0.5 bg-blue-600 transition-all duration-500 ease-in-out" 
                    style={{ width: currentStep === 1 ? '0%' : '100%' }}
                ></div>


                <div className="relative flex justify-between items-start">
                    {steps.map((label, index) => {
                        const stepNumber = index + 1;
                        const isActive = stepNumber === currentStep;
                        const isCompleted = stepNumber < currentStep;

                        return (
                            <div key={label} className="flex flex-col items-center text-center z-10 w-32">
                                <div 
                                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all duration-500 ease-in-out
                                        ${isCompleted ? 'bg-green-500 text-white' : ''}
                                        ${isActive ? 'bg-blue-600 text-white ring-4 ring-blue-200' : ''}
                                        ${!isCompleted && !isActive ? 'bg-white border-2 border-gray-300 text-gray-500' : ''}
                                    `}
                                >
                                    {isCompleted ? (
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                                    ) : (
                                        stepNumber
                                    )}
                                </div>
                                <p className={`mt-2 text-xs sm:text-sm font-semibold transition-colors duration-500 ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                                    {label}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};



const UdyamForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState<{ [key: string]: string }>({});
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({});
  const [showOTP, setShowOTP] = useState(false);

  const formSchema = schema as Schema;

  const validateField = (id: string, value: string): string | null => {
      const field = [...formSchema.step1.fields, ...formSchema.step2.fields].find(f => f.id === id);
      if (!field || !field.validation) return null;
      const { validation } = field;
      if (validation.required && !value) return `This field is required.`;
      if (validation.isNumber && value && !/^\d+$/.test(value)) return `${field.label} must be a number.`;
      if (validation.minLength && value.length < validation.minLength) return `${field.label} must be at least ${validation.minLength} characters.`;
      if (validation.pattern && !new RegExp(`^${validation.pattern}$`).test(value)) return `${field.label} has an invalid format.`;
      return null;
  };

  const handleInputChange = (id: string, value: string) => {
    setFormData(prev => ({ ...prev, [id]: value }));
    setErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
  };

  const handleButtonClick = async (action: string) => {
    if (action === 'validate_pan') {
       const panFieldsToValidate = formSchema.step2.fields.filter(f => f.type !== 'button');
       let isPanStepValid = true;
       const newErrors: { [key: string]: string | null } = {};
       panFieldsToValidate.forEach(field => {
           const error = validateField(field.id, formData[field.id] || '');
           if(error) { newErrors[field.id] = error; isPanStepValid = false; }
       });
       setErrors(prev => ({...prev, ...newErrors}));
       if(isPanStepValid) {
         console.log('Submitting form data:', formData);
         try {
            const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/submit`, {
               method: 'POST',
               headers: { 'Content-Type': 'application/json' },
               body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Network response was not ok');
            }
            const data = await response.json();
            console.log('Success:', data);
            alert('Form submitted successfully!');
         } catch (error) {
            console.error('Error:', error);
            alert(`Failed to submit form: ${error}`);
         }
       }
    } else if (action === 'generate_otp') {
        const fieldsToValidate = formSchema.step1.fields.filter(f => f.type !== 'button' && !f.condition);
        let isValid = true;
        const newErrors: { [key: string]: string | null } = {};
        
        fieldsToValidate.forEach(field => {
            const error = validateField(field.id, formData[field.id] || '');
            if (error) {
                newErrors[field.id] = error;
                isValid = false;
            }
        });

        setErrors(prev => ({...prev, ...newErrors}));
        if (isValid) {
            setShowOTP(true);
        }
    } else if (action === 'validate_otp') {
      const otpField = formSchema.step1.fields.find(f => f.id === 'ctl00_ContentPlaceHolder1_txtOtp1');
      const otpError = validateField(otpField!.id, formData[otpField!.id] || '');
       if(otpError) { setErrors(prev => ({...prev, [otpField!.id]: otpError})); return; }
       setCurrentStep(2);
    }
  };

  const currentStepSchema = currentStep === 1 ? formSchema.step1 : formSchema.step2;

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
        <Header />
        <main className="container mx-auto px-4 py-8">
            <h2 className="text-center text-xl md:text-2xl font-semibold text-gray-700 mb-8">UDYAM REGISTRATION FORM - For New Enterprise who are not Registered yet as MSME</h2>
            <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8">
                
                <ProgressBar currentStep={currentStep} />

                <div className="bg-blue-600 text-white font-bold p-4 rounded-t-lg mt-8">
                    {currentStepSchema.title}
                </div>
                <div className="p-6 md:p-8 border border-t-0 rounded-b-lg">
                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                        {currentStepSchema.fields.map(field => {
                            if (field.action === 'generate_otp' && showOTP) return null;
                            if (field.condition?.action === 'generate_otp' && !showOTP) return null;
                            
                            let isDisabled = false;
                            if (field.action === 'generate_otp') {
                                isDisabled = !formData['declaration'];
                            }
                            if (field.action === 'validate_pan') {
                                isDisabled = !formData['ctl00_ContentPlaceHolder1_chkDecarationP'];
                            }
                            
                            return <FormField key={field.id} field={field} value={formData[field.id] || ''} onChange={handleInputChange} error={errors[field.id] || null} onClick={handleButtonClick} isDisabled={isDisabled} />
                        })}
                    </div>
                     {currentStep === 1 && !showOTP && (
                        <div className="mt-6 text-sm text-gray-600 space-y-2 border-t pt-4">
                            <p>• Aadhaar number shall be required for Udyam Registration.</p>
                            <p>• The Aadhaar number shall be of the proprietor in the case of a proprietorship firm, of the managing partner in the case of a partnership firm and of a karta in the case of a Hindu Undivided Family (HUF).</p>
                            <p>• In case of a Company or a Limited Liability Partnership or a Cooperative Society or a Society or a Trust, the organisation or its authorised signatory shall provide its GSTIN(As per applicablity of CGST Act 2017 and as notified by the ministry of MSME vide S.O. 1055(E) dated 05th March 2021) and PAN along with its Aadhaar number.</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
        <Footer />
    </div>
  );
};

export default function App() {
  return <UdyamForm />;
}
