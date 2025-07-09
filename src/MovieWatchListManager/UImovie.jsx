import React, { useEffect, useState } from 'react';

function UImovie() {
    const [FullMovieData, setFullMovieData] = useState([]);
    const [checkInput, setCheckInput] = useState("");
    const [FilteredDATA, setFilteredDATA] = useState([]);
    const [inputData, setinputData] = useState({
        MovieName: "",
        MovieGenre: "",
        MovieDate: "",
        Watched: true,
    });
    const [ModalPopup, setModalPopup] = useState(false);

    function MoviePopUp() {
        setModalPopup(!ModalPopup);
    }

    function handleMovieData(name, value) {
        if (name === "status") {
            setinputData((prev) => ({
                ...prev,
                Watched: value === "Watched" ? true : false,
            }));
        } else {
            setinputData((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    }

      function SubmitData() {
        let data = JSON.parse(localStorage.getItem("MovieWatchlist")) || [];
        data = [...data, inputData];
        localStorage.setItem("MovieWatchlist", JSON.stringify(data));
        if (FullMovieData.length === 0) {
            setFullMovieData([inputData]);
            setFilteredDATA([inputData]);
        } else {
            setFullMovieData((prev) => [...prev, inputData]);
            setFilteredDATA((prev) => [...prev, inputData]);
        }
        setModalPopup(false);
        setinputData({
            MovieName: "",
            MovieGenre: "",
            MovieDate: "",
            Watched: false,
        });
    } 


    useEffect(() => {
        let data = JSON.parse(localStorage.getItem("MovieWatchlist"));
        setFilteredDATA(data);
        setFullMovieData(data);
    }, []);

    function handleEdit(card) {
        const updatedData = FullMovieData.map((item) =>
            item.MovieName === card.MovieName
                ? { ...item, Watched: !item.Watched }
                : item
        );

        setFullMovieData(updatedData);
        setFilteredDATA(updatedData);

        // Update localStorage as well (to persist changes on refresh)
        localStorage.setItem("MovieWatchlist", JSON.stringify(updatedData));
    }


    function handleDataDikhao(check) {
        if (check === "All") {
            setFullMovieData(FilteredDATA);
        } else if (check === "Watched") {
            let data = FilteredDATA.filter((item) => item.Watched === true);
            setFullMovieData(data);
        } else if (check === "Unwatched") {
            let data = FilteredDATA.filter((item) => item.Watched === false);
            setFullMovieData(data);
        }
    }

    function CheckInput(e) {
        setCheckInput(e);
        let data = FilteredDATA.filter((items) =>
            items.MovieName.toLowerCase().includes(e.toLowerCase())
        );
        setFullMovieData(data);
    }

    return (
        <div className='bg-gradient-to-br from-gray-900 to-black min-h-screen flex items-center justify-center relative'>
            {ModalPopup && (
                <div className='bg-white w-[300px] p-6 rounded-2xl shadow-2xl z-50 flex flex-col gap-4 absolute'>
                    <input
                        onChange={(e) => handleMovieData(e.target.name, e.target.value)}
                        className='h-10 w-full bg-gray-900 text-white rounded-md px-4 placeholder:text-gray-400'
                        type="text"
                        value={inputData.MovieName}
                        name="MovieName"
                        placeholder='Enter Movie Title'
                    />
                    <input
                        onChange={(e) => handleMovieData(e.target.name, e.target.value)}
                        className='h-10 w-full bg-gray-900 text-white rounded-md px-4 placeholder:text-gray-400'
                        type="text"
                        value={inputData.MovieGenre}
                        name="MovieGenre"
                        placeholder='Enter Genre'
                    />
                    <input
                        onChange={(e) => handleMovieData(e.target.name, e.target.value)}
                        className='h-10 w-full bg-gray-900 text-white rounded-md px-4'
                        type="date"
                        value={inputData.MovieDate}
                        name="MovieDate"
                    />
                    <select
                        onChange={(e) => handleMovieData(e.target.name, e.target.value)}
                        value={inputData.Watched ? "Watched" : "Hell NAh"} 
                        className='h-10 w-full bg-gray-200 text-black rounded-md px-2 font-medium'
                        name="status"
                    >
                        <option value="Watched">Watched</option>
                        <option value="Hell NAh">Unwatched</option>
                    </select>
                    <button
                        onClick={SubmitData}
                        className='mt-2 bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-semibold transition'
                    >
                        Submit
                    </button>
                </div>
            )}

            <div className='w-[90%] md:w-[70%] bg-zinc-800 p-6 rounded-xl flex flex-col items-center gap-6 shadow-lg'>
                <h1 className='text-4xl font-bold text-blue-400 mt-4 text-center'>
                    Movie Watchlist Manager
                </h1>

                <input
                    onChange={(e) => CheckInput(e.target.value)}
                    className='w-full h-10 rounded-md px-4 border border-zinc-500 bg-black text-white placeholder:text-gray-400'
                    type="text"
                    value={checkInput}
                    placeholder='Search movie by title...'
                />

                <div className='flex items-center justify-center flex-wrap gap-4'>
                    <button onClick={() => handleDataDikhao("All")} className='bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition'>All</button>
                    <button onClick={() => handleDataDikhao("Watched")} className='bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg font-medium transition'>Watched</button>
                    <button onClick={() => handleDataDikhao("Unwatched")} className='bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-2 rounded-lg font-medium transition'>Unwatched</button>
                </div>

                <button onClick={MoviePopUp} className='bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-xl font-semibold mt-2 transition'>
                    + Add Movie
                </button>

                <div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mt-4'>
                    {FullMovieData &&
                        FullMovieData.map((cards, index) => (
                            <div key={index} className='bg-gray-900 border border-gray-700 rounded-xl p-4 flex flex-col items-center'>
                                <h2 className='text-lg font-bold text-blue-300'>{cards.MovieName}</h2>
                                <div className='text-sm text-gray-300 mt-1 flex justify-between w-full'>
                                    <span>{cards.MovieGenre}</span>
                                    <span>{cards.MovieDate}</span>
                                </div>
                                <button
                                    onClick={() => handleEdit(cards)}
                                    className={`mt-3 px-4 py-1 rounded-full text-sm font-medium ${cards.Watched ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                        }`}
                                >
                                    {cards.Watched ? "Watched" : "Unwatched"}
                                </button>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
}

export default UImovie;
