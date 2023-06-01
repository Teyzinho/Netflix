import React from 'react'
import Lista from './componentes/Lista'
import categories from './api'

function Netflix() {
    return (
        <div>
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