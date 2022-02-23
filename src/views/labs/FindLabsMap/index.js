import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import Logo from 'src/components/Logo';
import { Link as RouterLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, TextField, Autocomplete, Button, Link } from '@material-ui/core';
import { Icon } from '@iconify/react';
import Switch from "react-switch";
import star from '@iconify-icons/eva/star-fill';
import GoogleMapViewer from './GoogleMapViewer';
import axios from 'axios';
import './style.css';
import heartFill from "@iconify-icons/eva/heart-fill";
import filter from "@iconify-icons/ant-design/filter";
import searchOutline from "@iconify-icons/eva/search-outline";
import flaskOutline from "@iconify-icons/ion/flask-outline";
import { PATH_PAGE } from 'src/routes/paths';
import { usePlacesWidget } from "react-google-autocomplete";
import { googleMapApiKey } from '../../../config';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Slider from '@material-ui/core/Slider';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100%',
    alignItems: 'center',
    backgroundColor: '#c52c3521!important',
    padding: '20px!important'
  },
  header: {
    top: 0,
    left: 0,
    lineHeight: 0,
    width: '100%',
    position: 'absolute',
    padding: theme.spacing(3, 3, 0),
    [theme.breakpoints.up('sm')]: {
      padding: theme.spacing(5, 5, 0)
    }
  }
}));

function FindLabsMap() {
  const classes = useStyles();

  const [checked, setChecked] = useState(false)
  const labs = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [labList, setLabList] = useState([]);
  const [testList, setTestList] = useState([]);

  const [filterDropdown, setFilterDropdown] = useState(false);

  const onFilterDropdown = () => {
    console.log("filter Drop")
    setFilterDropdown(!filterDropdown);
  }

  const handleChange = () => {
    setChecked(!checked);
  }

  const formatTime = (time, prefix) => {
    var date = new Date(time);
    return prefix + " " + date.toLocaleDateString();
  }

  useEffect(async () => {
    const testResult = await axios.get('/tests');

    const labs = await axios.get('/labs');

    let testData = testResult.data.Items;
    let LabData = labs.data.Items
    console.log(LabData);
    setLabList(LabData);
    setTestList(testData);

  }, []);

  const { ref } = usePlacesWidget({
    apiKey: googleMapApiKey,
    onPlaceSelected: (place) => {
      console.log(place);
    },
    options: {
      types: ["(regions)"],
      componentRestrictions: { country: "ru" },
    },
  });

  const [valuePrice, setValuePrice] = React.useState([20, 900]);
  const [valueStar, setValueStar] = React.useState([2, 4]);

  const handleChangePrice = (event, newValue) => {
    setValuePrice(newValue);
  };

  const handleChangeStar = (event, newValue) => {
    setValueStar(newValue);
  };

  return (
    <Page title="Find Labs" className={classes.root}>
      {/* <header className={classes.header}>
        
      </header> */}
      <Box
        sx={{
          width: '100%',
          borderRadius: '20px',
        }}>
        <div className="find-lab-header">
          <RouterLink to="/">
            <Box
              component="img"
              alt="logo"
              src="/static/brand/logo_full.svg"
              height={50}
            />
          </RouterLink>
          <div className="find-lab-header-nav">
            <p>Already have an account?</p>
            <Button
              underline="none"
              variant="contained"
              component={Link}
              target="_blank"
              style={{ borderRadius: '20px', padding: '8px 30px' }}
              href={PATH_PAGE.auth.login}
            >
              Login
                </Button>

            {/* <Button
              underline="none"
              variant="contained"
              component={Link}
              target="_blank"
              href={PATH_PAGE.auth.register}
            >
              Register
                </Button> */}
            {/* <button className="add-lab-btn">+ Add Lab</button> */}
          </div>

        </div>
        <Grid container>
          <Grid item xs={12} sm={12} md={6} lg={4} sx={{ padding: '0px 15px 0 0px' }}>

            <Grid container>
              <Grid item xs={12} sm={12} md={5} lg={5} className="selectItem">
                {/* <GooglePlacesAutocomplete
                  apiKey="AIzaSyCZtQFJtO5qzVlIpP-RAoJQgQGqAdEWo8Q"
                /> */}
                <Icon icon={searchOutline} width={25} height={25} className="search-icon-city" />
                <input ref={ref} className="city-input" defaultValue="" placeholder="Enter Location" />
                {/* <Autocomplete
                  sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                  fullWidth
                  options={citiList}
                  getOptionLabel={(option) => option.title}
                  renderInput={(params) => <TextField {...params} label={<span style={{ display: 'flex' }}><Icon icon={searchOutline} width={25} height={25} style={{ marginRight: '5px' }} /><span>Enter Location</span></span>} />}
                /> */}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={5} className="selectItem">
                <Autocomplete
                  sx={{ backgroundColor: '#ffffff', borderRadius: '8px' }}
                  fullWidth
                  options={testList}
                  getOptionLabel={(option) => option.Test_Name}
                  renderInput={(params) => <TextField {...params} label={<span style={{ display: 'flex' }}><Icon icon={flaskOutline} width={25} height={25} style={{ marginRight: '5px' }} /><span>Select Test</span></span>} />}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2} className="selectItem" style={{ position: 'relative' }}>
                <p className="filter-tag" onClick={onFilterDropdown}><Icon icon={filter} width={25} height={25} style={{ marginRight: '5px' }} />Filter</p>
                {
                  filterDropdown && <ul className="filter-dropdown">
                    <li><p>Price: </p>
                      <Slider
                        value={valuePrice}
                        onChange={handleChangePrice}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        step={10}
                        min={0}
                        max={1000}
                      />
                    </li>
                    <li><p>Location: </p><input type="text" placeholder="Location" style={{ paddingLeft: '10px', marginTop: '0', marginBottom: '10px' }} /></li>
                    <li><p>Star: </p>
                      <Slider
                        value={valueStar}
                        onChange={handleChangeStar}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        step={1}
                        marks
                        min={1}
                        max={5}
                      />
                    </li>
                    <li><Button underline="none" variant="contained" style={{ float: 'right' }} onClick={onFilterDropdown}>Submit</Button></li>
                  </ul>}
              </Grid>

              <div className="nab-title">
                <h3>283 Results <span>in <span style={{ textDecoration: 'underline' }}>Warsaw, Poland</span></span></h3>
                {/* <div style={{ marginRight: '10px' }}><Switch onChange={handleChange} checked={checked} /></div> */}
              </div>
            </Grid>
            <div className="labs-div">
              {
                labList && labList.map(lab => {
                  return (
                    <div key={lab.id} className="per-lab">
                      <div className="lab-image">
                        <img src="/static/images/project-4.jpg" />
                        {/* <p className="rateNum">100/85</p> */}
                        <div className="rating">
                          <Icon icon={star} width={20} height={20} />
                          <Icon icon={star} width={20} height={20} />
                          <Icon icon={star} width={20} height={20} />
                          <Icon icon={star} width={20} height={20} />
                          <Icon icon={star} width={20} height={20} />
                        </div>
                      </div>
                      <div className="per-lab-content">
                        <div className="per-lab-header">
                          <div className="lab-header-left">
                            <h4>Good Labs</h4>
                            <img src="/static/images/quality.png" style={{ width: '25px', height: '25px', marginLeft: '10px' }} />
                          </div>
                          <span className="lab-header-right">CoroaVirus</span>
                        </div>

                        <div>
                          <div className="area-price">
                            <span className="area">Golanz, Wroclaw</span>
                            <span className="price">550 NGN</span>
                          </div>
                          <div className="rating-div">
                            <p>Mon -Fri | 8am - 6pm</p>
                            <p>Results In: 5 hours</p>
                          </div>
                          <p className="badge-away">5 Km away</p>

                        </div>


                      </div>
                    </div>
                  )
                })
              }
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <GoogleMapViewer />
          </Grid>
        </Grid>
      </Box>
    </Page>
  );
}

const citiList = [
  { title: 'Lagos' },
  { title: 'Cano' },
  { title: 'Ibadan' },
  { title: 'Oyo' }
];

// const testList = [
//   { title: 'HIV' },
//   { title: 'HLV' },
//   { title: 'SHU' },
//   { title: 'ABC' },
//   { title: 'DEF' }
// ];
export default FindLabsMap;
