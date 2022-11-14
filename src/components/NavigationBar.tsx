import React, { Component } from 'react';
import { alpha, AppBar, Box, Button, FormControl, IconButton, InputAdornment, InputBase, InputLabel, OutlinedInput, styled, Toolbar, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import red from "@mui/material/colors/red";
import { deepOrange, green, orange, yellow } from "@mui/material/colors";



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
                    <img className="w-24 h-24 flex" src="/images/vegetables.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal transition
                flex place-content-center place-items-center'>Köögiviljad, puuviljad</a>
              </div>
                
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/milk.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Piimatooted ja munad
                </a>
              </div>

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/bread.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Leivad, saiad, kondiitritooted
                </a>
              </div>  

               <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/meat.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Liha, kala, valmistoit
                </a>
              </div> 
              
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/flour.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Kauasäilivad toidukaubad
                </a>
              </div>

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/frozen.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Külmutatud tooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/drinks.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Joogid
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/toothbrush.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Enesehooldustooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/cleaning.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Puhastustarbed ja lemmikloomatooted
                </a>
              </div>  

              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/children.svg" alt=""/>
                </button>
                <a href="" className='text-center break-normal 
                flex place-content-center place-items-center'>Lastekaubad
                </a>
              </div>  
              
              <div className='flex-column w-32 h-32 transition ease-in-out delay-50  hover:scale-110 hover:text-orange-400 duration-200'>
                <button className='transition ease-in-out delay-50  hover:scale-110 hover:bg-orange-200 duration-200
                bg-orange-50 rounded-full w-32 h-32 flex place-content-center place-items-center border-2 border-orange-100'>
                  <img className="w-24 h-24 flex" src="/images/home.svg" alt=""/>
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