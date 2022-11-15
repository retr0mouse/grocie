import React, { Component } from 'react';
import { alpha, AppBar, Box, Button, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import red from "@mui/material/colors/red";
import { deepOrange, green, orange, yellow } from "@mui/material/colors";
import VegetablesPicture from '../images/vegetables.svg'
import MilkPicture from '../images/milk.svg'
import BreadPicture from '../images/bread.svg'
import MeatPicture from '../images/meat.svg'
import BrushPicture from '../images/toothbrush.svg'
import FlourPicture from '../images/flour.svg'
import CleaningPicture from '../images/cleaning.svg'
import DrinksPicture from '../images/drinks.svg'
import FrozenPicture from '../images/frozen.svg'
import ChildrenPicture from '../images/children.svg'
import HomePicture from '../images/home.svg'
import Image from 'next/image'


    const Soodnecolor = deepOrange[400]

    const themeColor = createTheme({
        palette: {
          primary: {
            main: red[50]
          },
        secondary: {
            main: '#ff5722',
        },
        }
    });

    const Search = styled('div')(({ theme }) => ({
        position: 'sticky',
        borderRadius: "16px",
        backgroundColor: alpha(theme.palette.common.black, 0.15),
        '&:hover': {
          backgroundColor: alpha(theme.palette.common.black, 0.25),
        },
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: 'center',
        },
      }));
      
      const SearchIconWrapper = styled('div')(({ theme }) => ({
        padding: theme.spacing(2, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }));
      
      const StyledInputBase = styled(InputBase)(({ theme }) => ({
        color: 'inerit',
        marginRight: theme.spacing(20),
        '& .MuiInputBase-input': {
          padding: theme.spacing(2, 2, 2),
          paddingLeft: theme.spacing(7),
          transition: theme.transitions.create('width'),
          [theme.breakpoints.up('sm')]: {
            width: 'auto'
          },
        },
      }));

      const CategoryButton = styled('div')(({ theme }) => ({

      }));
      
export default function NavigationBar() {
        return (
        <ThemeProvider theme={themeColor}>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="relative">
              <Toolbar>
                <Typography
                  color={Soodnecolor}
                  variant="h2"
                  component="div"
                  sx={{ mr: 3 }}
                >
                <a className="ml-40"href="">Soodne</a></Typography>
                <Search sx={{zIndex:'tooltip'}} 
                >
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </Search>
                <IconButton
                  size="large"
                  edge="start"
                  color="secondary"
                  aria-label="open drawer"
                  sx={{ ml: 2, mr: 40}}
                >
                  <ShoppingCartOutlinedIcon/>
                </IconButton>
              </Toolbar>
            </AppBar>
          </Box>
          <Box sx={{ mt: 2 }}>
            <div className="flex place-content-center space-x-4"> 
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                  bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                    <Image className="w-24 h-24 flex" src={VegetablesPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal transition
                flex place-content-center place-items-center'>Köögiviljad, puuviljad</a>
              </div>
                
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={MilkPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Piimatooted ja munad
                </a>
              </div>

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={BreadPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Leivad, saiad, kondiitritooted
                </a>
              </div>  

               <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={MeatPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Liha, kala, valmistoit
                </a>
              </div> 
              
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={FlourPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Kauasäilivad toidukaubad
                </a>
              </div>

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={FrozenPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Külmutatud tooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={DrinksPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Joogid
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={BrushPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Enesehooldustooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={CleaningPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Puhastustarbed ja lemmikloomatooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={ChildrenPicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Lastekaubad
                </a>
              </div>  
              
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <Image className="w-24 h-24 flex" src={HomePicture} alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Kodukaubad ja vaba aeg
                </a>
              </div>      
            </div>
          </Box>
        </ThemeProvider>
        );    
}