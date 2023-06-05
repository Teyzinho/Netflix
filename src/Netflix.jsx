import React, { useState } from 'react';
import Lista from './componentes/Lista'
import Banner from './componentes/Banner'
import Modal from './componentes/Modal'
import categories from './api'
import './Netflix.css'
import Navbar from './componentes/Navbar'


function Netflix() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [filmes, setFilmes] = useState("");

    const openModal = (filme) => {
        setIsModalOpen(true);
        setFilmes(filme);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <Navbar />
            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                filme={filmes}
            >
                {/* Conteúdo da modal */}
            </Modal>
            <Banner />
            {categories.map((categoria) => {
                return (
                    <Lista
                        key={categoria.name}
                        title={categoria.title}
                        path={categoria.path}
                        onOpen={openModal}
                    />
                );
            })}
        </div>
    )
}

export default Netflix;