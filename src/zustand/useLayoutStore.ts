import { create } from 'zustand'


const useLayoutStore = create<{ title: string, setTitle: (data: string) => void }>((set) => ({
    title: "Anasayfa",
    setTitle: (data: string) => {
        set(() => ({
            title: data
        }))
    }
}));

export default useLayoutStore;
