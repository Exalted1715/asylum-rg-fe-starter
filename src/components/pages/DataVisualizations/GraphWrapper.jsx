import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }

  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
//writing new api intgration here, asnychronous function here, so others dont have to wait
  async function fetchData(years, view, office) {
    const baseUrl = 'https://hrf-asylum-be-b.herokuapp.com/cases';
    let url;
  
    //Construct the URL based on the view
    if (view === 'time-series') {

    //For the time-series view, we need to fiscalSummary endpoint
      url = `${baseUrl}/fiscalSummary?from=${years[0]}&to=${years[1]}`;
    } else if (view === 'citizenship') {

    //For the citizenship view, we need the citzenshipSummary endpoint
      url = `${baseUrl}/citizenshipSummary?from=${years[0]}&to=${years[1]}`;
    }
  
    //If an office is specidied and it is not 'all', add it to the query string
    if (office && office !== 'all') {
      url += `&office=${office}`;
    }
  
    //Fetch data from the constructed URL 
    try {
      const response = await axios.get(url);
      console.log('API response data:', response.data); //  log the response data
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  //updated state here
  async function updateStateWithNewData(years, view, office, stateSettingCallback) {
    try {
      const data = await fetchData(years, view, office);
      console.log('Data received in updateStateWithNewData:', data); // Log the data received
      if (data && data.yearResults) {
        console.log('yearResults is present in the data:', data.yearResults); // Log yearResults
        stateSettingCallback(view, office, data);
      } else {
        console.error('yearResults is not present in the data');
        throw new Error('Invalid data format');
      }
    } catch (error) {
      console.error('Error updating state with new data:', error);
    }
  }

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };

  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
