import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { modeSwitch } from '../../store/mode';
import { RootState } from '../../store/store';
import { ICardProps } from '../cards/Card';

export function AppControls() {
    const token = useSelector<RootState, string>((state) => state.token)
    const loading = useSelector<RootState, boolean>((state) => state.items.loading)
    const error = useSelector<RootState, string>((state) => state.items.error)
    const postsList = useSelector<RootState, ICardProps[]>((state) => state.items.data)
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
        <section className='app-controls'>
            <div className='app-controls-container row p-5 text-center'>                   
                <div className='col'>   
                    {!token || token === 'undefined' &&
                        <>
                            <p>Чтобы увидеть карточки, авторизуйтесь</p> 
                            <a className='btn btn-lg btn-outline-info'
                                href={`https://www.reddit.com/api/v1/authorize?client_id=${process.env.CLIENT_ID}&response_type=code&state=random_string&redirect_uri=http://localhost:3000/auth&duration=permanent&scope=read identity submit`}>
                                Авторизация
                            </a>
                        </>
                    }
                    {/* 
                        в принципе, проверка на наличие ошибки тут не нужна, поскольку есть проверка на пустой список,
                        а при ошибке список будет пустой, но для того, чтобы все было правильно, проверка на наличие ошибок добавлена
                    */}
                    {token && token !== 'undefined' && !loading && error === '' && postsList.length !== 0 && 
                        <button className='btn btn-lg btn-outline-info' onClick={changeMode}>{mode}</button>
                    }
                </div>
            </div>
        </section>
  );
}