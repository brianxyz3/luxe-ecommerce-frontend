import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios";


const productCategories = [
    "Skin-care",
    "Hair-care",
    "Dental-care",
    "Facial-care",
    "Nail-care",
    "Makeup",
    "Fragrance",
];

const productTypes = [
    "Serum",
    "Cream",
    "Lotion",
    "Liquid",
    "Scrub",
    "Wash",
    "Soap",
    "Perfume",
    "Powder",
    "Tool",
];
const AdminAddInventoryPage = () => {
    const navigate = useNavigate();
    const { currentUser, userLoggedIn } = useAuth();
    const [formFileData, setFormFileData] = useState<{image: File | null}>({image: null})
    const [formTextData, setFormTextData] = useState({
      product: {
        name: "",
        category: "",
        brandName: "",
        description: "",
        type: "",
        price: 0,
        units: 0,
      },
      unitsSold: 0,
    });


    useEffect(() => {
        if(!userLoggedIn) {
            navigate("/auth")
            return
        }
    }, []);


    // const errorStyle = { color: "red" };

    // const validateForm = {
    //     type: {
    //         required: "Selected the job type",
    //     },
    //     title: {
    //         required: "Job listing name cannot be blank",
    //     },
    //     salary: {
    //         required: "Select the salary range",
    //     },
    //     location: {
    //         required: "Location cannot be blank",
    //     },
    //     name: {
    //         required: "Company name cannot be blank",
    //     },
    //     email: {
    //         required: "Company Contact email cannot be blank",
    //     },
    // };

    const allowedImageFileType = ['image/jpeg', 'image/png', 'application/jpg'];
     const maxFileSize = 1 * 1024 * 1024; // 1MB


    const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormTextData({ ...formTextData, product:{ ...formTextData.product, [e.target.name]: e.target.value} });
    };

    const handleInventoryChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormTextData({ ...formTextData, [e.target.name]: e.target.value});
    };

    const submitAddForm = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        const formData = new FormData();
        if (userLoggedIn) {
            formData.append("text", JSON.stringify(formTextData))
            if(formFileData.image) formData.append("file", formFileData.image)
            axios({
                method: "POST",
                url: "/api/inventory/add",
                headers: {
                    "auth": `Bearer- ${currentUser?.token}`,
                },
                data: formData
            }).then(({data}) => {
                toast.success(data.message);
                return navigate(`/admin/inventory/${data.inventory._id}`);
            }).catch(error => {
                toast.error(error.response.data.message)
                return;
            })
        } else {
            navigate("/auth");
        };
    };


    return (
        <>
        <section className="bg-cream-lighter dark:bg-stone-700 w-full">
            <div className="container m-auto max-w-xl py-24">
                <div
                    className="bg-cream-light dark:bg-amber-900/15 px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0"
                >
                    <form onSubmit={submitAddForm}>
                    <h2 className="text-3xl text-center font-semibold mb-6">Add Product</h2>

                    <div className="mb-4">
                        <label htmlFor="name" className="text-gray-600 tracking-wider font-bold"
                        >Product Name:</label>
                        <Input value={formTextData.product.name} type="text" id="name" name="name" onChange={handleProductChange} className="shadow-md bg-cream-lighter"/>
                    </div>


                    <div className="mb-4">
                        <label htmlFor="brandName" className="text-gray-600 tracking-wider font-bold"
                        >Brand Name:</label>
                        <Input value={formTextData.product.brandName} type="text" name="brandName" id="brandName" onChange={handleProductChange} className="shadow-md bg-cream-lighter"/>
                        {/* {errors.company && <span style={errorStyle}>{validateForm.name.required}</span>} */}
                    </div>

                    <div className="flex flex-wrap gap-x-3 md:gap-10">
                    <div className="mb-4">
                        <label htmlFor="category" className="text-gray-600 tracking-wider font-bold"
                        >Category:</label>
                        <Select name="category" value={formTextData.product.category} onValueChange={(value) => setFormTextData({...formTextData, product:{...formTextData.product, category: value}})}>
                            <SelectTrigger className="w-[160px]">
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Product Category</SelectLabel>
                                {productCategories.map((category) => (
                                    <SelectItem key={category} value={category.toLowerCase()}>{category}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        {/* {errors.title && <span style={errorStyle}>{validateForm.title.required}</span>} */}
                    </div>

                    <div className="mb-4">
                        <label htmlFor="type"
                            className="text-gray-600 tracking-wider font-bold"
                        >Type:</label>
                        <Select name="type" value={formTextData.product.type} onValueChange={(value) => setFormTextData({...formTextData, product:{...formTextData.product, type: value}})}>
                            <SelectTrigger className="w-[130px]">
                                <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                <SelectLabel>Product Type</SelectLabel>
                                {productTypes.map((type) => (
                                    <SelectItem key={type} value={type.toLowerCase()}>{type}</SelectItem>
                                ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    </div>
                    <div className="flex flex-wrap gap-x-4">
                    <div className="mb-4">
                        <label htmlFor="price"
                            className="text-gray-600 tracking-wider font-bold"
                        >Price(₦):</label>
                        <Input value={formTextData.product.price} id="price" name="price" type="number" onChange={handleProductChange} className="shadow-md w-[130px] max-w-fit bg-cream-lighter"/>
                        {/* {errors.contact && <span style={errorStyle}>{validateForm.email.required}</span>} */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="units"
                            className="text-gray-600 tracking-wider font-bold"
                        >Units:</label>
                        <Input value={formTextData.product.units} id="units" name="units" type="number" onChange={handleProductChange} className="shadow-md w-[60px] max-w-fit bg-cream-lighter"/>
                        {/* {errors.contact && <span style={errorStyle}>{validateForm.email.required}</span>} */}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="unitsSold"
                            className="text-gray-600 tracking-wider font-bold"
                        >Units Sold:</label>
                        <Input value={formTextData.unitsSold} id="unitsSold" name="unitsSold" type="number" onChange={handleInventoryChange} className="shadow-md w-[60px] max-w-fit bg-cream-lighter"/>
                        {/* {errors.contact && <span style={errorStyle}>{validateForm.email.required}</span>} */}
                    </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image">Image(s):</label>
                        <Input 
                            type="file" 
                            id="image" 
                            name="image" 
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if(e.target.files) {
                                    const selectedFile = e.target.files[0];
                                    if(allowedImageFileType.includes(selectedFile.type) && selectedFile.size <= maxFileSize) return setFormFileData({ image: selectedFile} );
                                }
                                setFormFileData({ image: null })
                            }}
                            className="shadow-md bg-cream-lighter"
                        />
                    </div>

                    <div className="mb-8">
                        <label htmlFor="description" className="text-gray-600 tracking-wider font-bold"
                        >Description:</label>
                        <Textarea value={formTextData.product.description} name="description" onChange={handleProductChange} id="description" className="shadow-md"/>
                    </div>

                    <Button
                        className="text-white font-bold py-2 tracking-wider h-fit px-4 rounded-full w-full focus:outline-none focus:shadow-outline duration-200"
                        type="submit"
                    >
                        Add Product
                    </Button>
                </form>
                    <Button
                        type="button"
                        onClick={() => navigate(`/admin/dashboard`)}
                        className="bg-blue-700 dark:bg-blue-700/80 h-fit dark:hover:bg-blue-700/90 hover:bg-blue-700/80 text-white text-center block font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-3 duration-200"
                    >
                        Back to Dashboard
                    </Button>
                </div>
            </div>
            </section>
        </>
    )
}

export default AdminAddInventoryPage;