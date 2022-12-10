import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modeSwitch } from '../../store/mode';
import { RootState } from '../../store/store';
import styles from './appcontrols.css';

export function AppControls() {
    const token = useSelector<RootState, string>((state) => state.token)
    const loading = useSelector<RootState, boolean>((state) => state.items.loading)
    const [mode, setMode] = useState('Показать Избранное')
    const dispatch = useDispatch<any>()
    
    const changeMode = () => {
        mode === 'Показать Избранное' ? setMode('Снять фильтр') : setMode('Показать Избранное')
    }

    // тут соответствие выполнено наоборот, поскольку, когда отображаются все карточки,
    // кнопка должна быть "Показать Избранное" и наоборот
    useEffect(() => {
        mode === 'Показать Избранное' ? dispatch(modeSwitch('all')) : dispatch(modeSwitch('favorites'))
    }, [mode])
    
    return (
        <section className={styles.appControls}>
            <div className={styles.appControlsContainer}>                   
                {!token &&
                    <>
                        <p className={styles.authorizationMsg}>Чтобы увидеть карточки, авторизуйтесь</p> 
                        <a className={styles.btn} 
                            href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read identity submit`}>
                            Авторизация
                        </a> 
                    </>
                }
                {token && !loading && <button className={styles.btn} onClick={changeMode}>{mode}</button>}
            </div>
        </section>
  );
}