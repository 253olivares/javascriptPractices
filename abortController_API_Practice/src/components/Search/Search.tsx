"use client";

// this code does not belong to me 
// only using it to practice abort controller
import Image from 'next/image';
import React, { useState,useRef } from 'react';

interface Result {
  poster: string;
  title: string;
  year: string;
}

const Search = () => {
  
  // create a ref that will be in charge of keeping track of our abort controller instance
  const controllerRef = useRef<AbortController>()
  const [query, setQuery] = useState<string>();
  const [results, setResults] = useState<Array<{ item: Result }> | undefined>();

  async function handleOnChange(e: React.SyntheticEvent) {
    const target = e.target as typeof e.target & {
      value: string;
    };

    setQuery(target.value);
    setResults(undefined);

    // check to see if we have anything loaded / tracked in our controller ref
    if(controllerRef.current) {
      // if it detects our abort controller then we abort the controller
      controllerRef.current.abort();
    }

    // set our abort controller in current
    controllerRef.current = new AbortController();
    // create a signal that we are going to use to track our fetch
    const signal = controllerRef.current.signal;
    try {
    const response = await fetch('/api/search', {
      method: 'POST',
      body: JSON.stringify({
        query: target.value
      }),
      // pass our signal into fetch so that when we abort the API knows to cancel this request.
      signal
    })

    const data = await response.json();
    
    setResults(data.results);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="w-full px-6 max-w-4xl mx-auto">
      <form className="max-w-sm mx-auto mb-4">
        <input className="w-full rounded" type="text" name="query" onChange={handleOnChange} />
      </form>
      {query && (
        <p className="mb-6">
          Results for <strong>{ query }</strong>
        </p>
      )}
      {Array.isArray(results) && results.length > 0 && (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          { results.map(({ item }) => {
            return (
              <li key={item.title}>
                <Image className="block rounded shadow mb-2" width="640" height="960" src={item.poster} alt="Poster" />
                <span className="block font-semibold">{ item.title }</span>
                <span className="block text-sm">{ item.year }</span>
              </li>
            );
          })}
        </ul>
      )}
      {Array.isArray(results) && results.length === 0 && (
        <p className="font-bold text-xl">No results found!</p>
      )}
    </div>
  )
}

export default Search;