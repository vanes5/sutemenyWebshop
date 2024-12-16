import { useEffect, useState } from "react";
import { Sutemeny } from "../Sutemeny";
import SutiCard from "./SutiCard";
import { products } from "../api";

export default function HomePage(){
    const [sutemenyek, setSutemenyek] = useState<Sutemeny[]>([]);
    const [filteredSutemenyek, setFilteredSutemenyek] = useState<Sutemeny[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState<{key: keyof Sutemeny; direction: 'asc' | 'desc'} | null>(null)

    useEffect(() => {
        const fetchProducts = async () => {
          try {
            const fetchedSutemenyek = await products();
            setSutemenyek(fetchedSutemenyek);
            setFilteredSutemenyek(fetchedSutemenyek);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchProducts();
      }, []);
      

      const sortSutemenyek = (key: keyof Sutemeny, direction: 'asc' | 'desc') => {
        const sortedSutemenyek = [...filteredSutemenyek].sort((a, b) => {
          if (typeof a[key] === 'string' && typeof b[key] === 'string') {
            return a[key].localeCompare(b[key], 'en', { sensitivity: 'base' }) * (direction === 'asc' ? 1 : -1);
          }
          if (typeof a[key] === 'number' && typeof b[key] === 'number') {
            return (a[key] - b[key]) * (direction === 'asc' ? 1 : -1);
          }
          return 0;
        });
    
        setFilteredSutemenyek(sortedSutemenyek);
        setSortConfig({ key, direction });
      };

      const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = sutemenyek.filter((sutemeny) => 
          sutemeny.name.toLowerCase().includes(term) || 
          sutemeny.description.toLowerCase().includes(term)
        );
        setFilteredSutemenyek(filtered);
      };


    return<>
        <form className="form-group  mb-3" style={{display: "flex", justifyContent: "center", alignItems: "center"}} onSubmit={(e) => {e.preventDefault();}}>
            <input type="text" className="col-sm-2" style={{marginLeft: "1rem"}} value={searchTerm} onChange={handleSearch} placeholder="Keresés"/>
            <button type="button" className=" btn btn-secondary col-sm-1" style={{marginLeft: "1rem"}} onClick={() => sortSutemenyek('price', 'asc')}>&#8593;</button>
            <button type="button" className="btn btn-secondary col-sm-1" style={{marginLeft: "1rem"}} onClick={() => sortSutemenyek('price', 'desc')}>&#8595;</button>
        </form>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: "center", alignItems:"center"}}>
            {filteredSutemenyek.map((suti) => (
                <SutiCard key={suti.id} suti={suti} />
            ))}
        </div>
    </>
}