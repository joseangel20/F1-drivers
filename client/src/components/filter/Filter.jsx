/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Search/SearchBar";
import {
  getTeamsAction,
  getDriverNamesAction,
  filterOriginAction,
  filterAction,
  filterTeamAction,
} from "../../redux/actions";

export default function Filter({ updateHome, axiosData }) {
    
  const dispatch = useDispatch();
  const [optionFilter, setOptionFiilter] = useState({});
  const teams = useSelector((state) => state.teamsReducer.teams);

  // Filtra drivers por teams
  const teamFilterHandler = (e) => {
    const team = e.target.value;
    setOptionFiilter({ ...optionFilter, team });
    localStorage.team = team;
    if (optionFilter.name)
      axiosData(dispatch, getDriverNamesAction, localStorage.name);
    dispatch(filterTeamAction(team));
    if (optionFilter.origen) dispatch(filterOriginAction(optionFilter.origen));
    if (optionFilter.filter) dispatch(filterAction(optionFilter.filter));

    updateHome.setUpdate(!updateHome.update);
  };

  // Filtra drivers por origen
  const showOrigenHandler = (e) => {
    const origen = e.target.value;
    setOptionFiilter({ ...optionFilter, origen });
    localStorage.origen = origen;

    if (optionFilter.name)
      axiosData(dispatch, getDriverNamesAction, localStorage.name);
    dispatch(filterTeamAction(optionFilter.team));

    dispatch(filterOriginAction(origen));
    dispatch(filterAction(optionFilter.filter));

    updateHome.setUpdate(!updateHome.update);
  };

  // Ordena drivers por nombre o fecha
  const filterHandler = (e) => {
    const filter = e.target.value;
    setOptionFiilter({ ...optionFilter, filter });
    localStorage.filter = filter;

    dispatch(filterAction(filter));

    updateHome.setUpdate(!updateHome.update);
  };

  // Se almacena un conjunto de elementos de options
  const elementOption = teams.map((team) => {
    return (
      <option key={team.id} value={team.name}>
        {team.name}
      </option>
    );
  });

  useEffect(() => {
    getTeamsAction().then((dispatchTeams) => {
      dispatchTeams(dispatch);
    });

    const { team, name, origen, filter } = localStorage;
    setOptionFiilter({ ...optionFilter, team, name, origen, filter });
  }, [dispatch]);

  return (
    <div>
      <SearchBar
        axiosData={axiosData}
        option={{ optionFilter, setOptionFiilter }}
        updateHome={updateHome}
      />
      <label htmlFor="team">Filtrar por team: </label>
      <div>
        <select
          name="team"
          id="team"
          value={optionFilter.team}
          onChange={teamFilterHandler}
        >
          <option value="">seleccionar team</option>
          {elementOption}
        </select>
      </div>
      <label htmlFor="origen">Filtrar por origen: </label>
      <div>
        <select
          name="origen"
          id="origen"
          onChange={showOrigenHandler}
          value={optionFilter.origen}
        >
          <option value="api">API</option>
          <option value="dataBase">Data Base</option>
        </select>
      </div>
      <div>
        <label htmlFor="filter">Filtrar por: </label>
        <select
          name="filter"
          id="filter"
          onChange={filterHandler}
          value={optionFilter.filter}
        >
          <option value="name_asce">Nombre / ascendente</option>
           <option value="name_desc">Nombre / descendente</option>
          <option value="dob_asce">Fecha / ascendente</option>
          <option value="dob_desc">Fecha / descendente</option>
        </select>
      </div>
    </div>
  );
}
