/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import randomSandwichPlacer from '../../game_functions/randomSandwichPlacer';
import GameGrid from './GameGrid';
import MyGrid from './MyGrid';
import '../../scss/GameTable.scss';

export default function GameTable() {
  const {
    //
    allGingham,
    gameGrid,
    myGrid,
    iso,
    view,
  } = useSelector((state) => state);
  const dispatch = useDispatch();

  function handleFlipGameGingham(color) {
    dispatch({ type: 'FLIP_GAME_GINGHAM', payload: { color } });
  }

  function handleFlipMyGingham(color) {
    dispatch({ type: 'FLIP_MY_GINGHAM', payload: { color } });
  }

  function handleFlipTable() {
    const newView = view === 'showTop' ? 'showBottom' : 'showTop';
    dispatch({ type: 'FLIP_TABLE', payload: { newView } });
  }

  function handleFlipIso() {
    const newIso = iso === 'iso' ? 'flat' : 'iso';
    dispatch({ type: 'FLIP_ISO', payload: { newIso } });
  }

  function handleRandomEnemyPlacement() {
    const tempCoordsArray = randomSandwichPlacer();
    const tempCoords = tempCoordsArray.map((c) => c.slice(3));
    const updateGrid = gameGrid.map((s) => {
      if (tempCoords.includes(s.id)) {
        return { ...s, open: false };
      }
      return { ...s, open: true };
    });
    dispatch({ type: 'RANDOM_ENEMY_PLACEMENT', payload: { updateGrid } });
  }

  function handleRandomPlayerPlacement() {
    const tempCoordsArray = randomSandwichPlacer();
    const tempCoords = tempCoordsArray.map((c) => c.slice(3));
    const updateGrid = myGrid.map((s) => {
      if (tempCoords.includes(s.id)) {
        return { ...s, open: false };
      }
      return { ...s, open: true };
    });
    dispatch({ type: 'RANDOM_PLAYER_PLACEMENT', payload: { updateGrid } });
  }

  return (
    <div className={`GameTable ${iso === 'iso' ? 'iso' : 'flat'}`}>
      <section className="table-flip__container">
        <div
          className={`table-flip__body 
          ${view === 'showTop' ? 'showTop' : 'showBottom'}
          ${iso === 'iso' ? 'iso' : 'flat'}`}
        >
          <div className="table-flip__body--top">
            <GameGrid />
          </div>
          <div className="table-flip__body--bottom">
            <MyGrid />
          </div>
        </div>
      </section>
      <section className="controls">
        <button onClick={handleFlipTable} type="button">
          Flip
        </button>
        <button onClick={handleFlipIso} type="button">
          Iso / Flat
        </button>
        {view === 'showTop' &&
          allGingham.map((c) => (
            <button
              aria-label="gingham pattern"
              key={c}
              onClick={() => handleFlipGameGingham(c)}
              className={`gingham-swatch ${c}`}
              type="button"
            />
          ))}
        {view === 'showBottom' &&
          allGingham.map((c) => (
            <button
              aria-label="gingham pattern"
              key={c}
              onClick={() => handleFlipMyGingham(c)}
              className={`gingham-swatch ${c}`}
              type="button"
            />
          ))}
        <span
          tabIndex="0"
          aria-label="sandwich"
          className="sandwich"
          role="button"
          onClick={handleRandomEnemyPlacement}
          onKeyPress={handleRandomEnemyPlacement}
        >
          🥪
        </span>
        <span
          tabIndex="0"
          aria-label="sandwich"
          className="sandwich"
          role="button"
          onClick={handleRandomPlayerPlacement}
          onKeyPress={handleRandomPlayerPlacement}
        >
          🍔
        </span>
      </section>
    </div>
  );
}
