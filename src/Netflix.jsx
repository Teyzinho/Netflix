import React from 'react'
import Lista from './componentes/Lista'
import Banner from './componentes/Banner'
import categories from './api'
import './Netflix.css'


function Netflix() {
    return (
        <div>
            <Banner />
            {categories.map((categoria) => {
                return (
                    <Lista
                        key={categoria.name}
                        title={categoria.title}
                        path={categoria.path}
                    />
                );
            })}
        </div>
    )
}

export default Netflix;