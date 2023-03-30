import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import BreadPicture from '../images/bread.svg';
import CategoryButton from '../images/category-menu.svg';
import ChildrenPicture from '../images/children.svg';
import CleaningPicture from '../images/cleaning.svg';
import CrossPicture from '../images/cross.svg';
import DrinksPicture from '../images/drinks.svg';
import FlourPicture from '../images/flour.svg';
import FrozenPicture from '../images/frozen.svg';
import HomePicture from '../images/home.svg';
import MeatPicture from '../images/meat.svg';
import MilkPicture from '../images/milk.svg';
import OtherPicture from '../images/other.svg';
import BrushPicture from '../images/toothbrush.svg';
import VegetablesPicture from '../images/vegetables.svg';
import CartIcon from './../images/cart-white.svg';

const categories = [
    [VegetablesPicture, "Fruits and Vegetables"],
    [MilkPicture, "Milk and Eggs"],
    [BreadPicture, "Bread and pastries"],
    [MeatPicture, "Meat, fish, ready food"],
    [FlourPicture, "Long-lasting food"],
    [FrozenPicture, "Frozen"],
    [DrinksPicture, "Drinks"],
    [BrushPicture, "Self care"],
    [CleaningPicture, "Cleaning supplies and pet products"],
    [ChildrenPicture, "Children's goods"],
    [HomePicture, "Home goods and leisure"],
    [OtherPicture, "Other"]
];

export default function MobileMenu() {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            <div className='flex sm:hidden bg-neutral-800 fixed bottom-0 w-full h-20 text-stone-300 items-center'>
                {/* <button className="w-full h-full flex flex-col items-center p-2" onClick={() => { setIsOpen(!isOpen) }}>
                    <Image className="max-w-[50%] max-h-[50%]" src={BurgerButton} alt="hamburger button" />
                    <span className="mt-1 text-md text-[#f2f6f7]">Menu</span>
                </button> */}
                <button className="w-full h-full flex flex-col items-center p-2" onClick={() => { setIsOpen(!isOpen) }}>
                    <Image className="max-w-[50%] max-h-[50%]" src={CategoryButton} alt="category button" />
                    <span className="mt-1 text-md text-[#f2f6f7]">Categories</span>
                </button>
                <Link href={'/basket'} className='w-full h-full flex flex-col items-center p-2'>
                    <Image className="max-w-[50%] max-h-[50%]" src={CartIcon} alt="category button" />
                    <span className="mt-1 text-md text-[#f2f6f7]">Cart</span>
                </Link>
            </div>
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 overflow-y-auto">
                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4 w-full h-full">
                        {/* The actual dialog panel  */}
                        <Dialog.Panel className="rounded-sm mx-auto max-w-full max-h-full bg-white w-full h-full">
                            <div className="p-5 flex rounded-t-sm bg-neutral-200 w-full border-b-2 items-center justify-between">
                                <Dialog.Title className='text-3xl font-poppins leading-normal ml-3 text-slate-800'>Categories</Dialog.Title>
                                <button className="w-6 h-6" onClick={() => setIsOpen(false)}>
                                    <Image className='w-full h-full' src={CrossPicture} alt='cross image'/>
                                </button>
                            </div>
                            <div className="p-5 bg-white flex flex-col place-content-center">
                                {categories.map((category, index) => {
                                    return (
                                        <Link key={index} href={`/category/${index}`} onClick={() => setIsOpen(false)}>
                                            <div className='border-b-2 border-slate-100 flex items-center'>
                                                <Image src={category[0]} alt={category[1] + " icon"} className="self-center w-16 p-2"/>
                                                <p className='ml-6 text-2xl text-slate-700 font-medium break-word self-center'>
                                                    {category[1]}
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                })}
                            </div>
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>
        </>
    );
}