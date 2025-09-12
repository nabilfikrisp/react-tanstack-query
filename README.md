# React + TypeScript + TanStack Query

## Requirement

- **Node.js** versi **20.x atau lebih baru**  
  (Saya menggunakan **22.19.0**)
- **npm**
  (Saya menggunakan **pnpm**)

---

## Cara Menjalankan Program

### 1. Clone Repository

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Salin file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

Lalu sesuaikan value di dalam `.env` jika diperlukan.

### 4. Jalankan Mock Server

Untuk menyiapkan **json-server** sebagai mock API:

```bash
npm run mock-server:seed:start
```

Mock server akan berjalan di **[http://localhost:4000](http://localhost:4000)**

### 5. Jalankan Aplikasi Frontend

Buka terminal baru lalu jalankan:

```bash
npm run dev
```

Secara default, aplikasi berjalan di:
[http://localhost:5173](http://localhost:5173)

---

## Struktur Script Penting

- `npm run mock-server:seed:start` → seed data + menjalankan JSON Server.
- `npm run mock-server:seed` → hanya seed data.
- `npm run mock-server:start` → hanya jalankan JSON Server.
- `npm run dev` → menjalankan aplikasi React (Vite).
- `npm run build` → build untuk produksi.
- `npm run preview` → preview hasil build.
- `npm run lint` → cek linting.

---

## Catatan

- Mock server berbasis **json-server** dan data seed dari `./mock-server/seed.ts`.
- API default: `http://localhost:4000`
- Frontend default: `http://localhost:5173`

---

# Jawaban Essay

## Jawaban Soal Pertama

Props dengan TypeScript sangat bermanfaat dalam React karena membantu memastikan data yang dikirim dari parent ke child component sesuai kebutuhan. Dengan TypeScript kita bisa mendefinisikan type data, membedakan mana props yang wajib dan mana yang optional. Jika ada props yang tidak sesuai type atau tidak lengkap, TypeScript akan memberikan error saat compile sehingga bug bisa dicegah lebih awal. Bahkan error akan muncul jika kita menggunakan extension TypeScript di IDE. Selain itu, dukungan autocompletion membuat penulisan props lebih cepat dan minim kesalahan. Saya mengetahui dua cara menginisiasi component props dengan TypeScript

Cara Pertama

```tsx
type CompProps = {
  header: string;
  description?: string;
};
export function Comp({ header, description }: CompProps) {
  return (
    <div>
      <h1>{header}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}
```

Cara Kedua

```tsx
import { FC } from "react";

type CompProps = {
  header: string;
  description?: string;
};
export const Comp: FC<CompProps> = ({ header, description }) => {
  return (
    <div>
      <h1>{header}</h1>
      {description && <p>{description}</p>}
    </div>
  );
};
```

### Props inheritance

Kita bisa extend props bawaan HTML lalu tambah props custom sendiri:

```tsx
import { InputHTMLAttributes } from "react";

// Semua props input HTML + props custom
type CustomInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  errorMessage?: string;
};

export function CustomInput({
  label,
  errorMessage,
  ...rest
}: CustomInputProps) {
  return (
    <div>
      {label && <label>{label}</label>}
      <input {...rest} />
      {errorMessage && <span style={{ color: "red" }}>{errorMessage}</span>}
    </div>
  );
}
```

### Extending Component kita sendiri

Kita bisa inherit props dari component lain dan menambahkan props baru:

```tsx
// Component pertama
type CustomCompFirstProps = {
  header: string;
  description?: string;
};

export function CustomCompFirst({ header, description }: CustomCompFirstProps) {
  return (
    <div>
      <h1>{header}</h1>
      {description && <p>{description}</p>}
    </div>
  );
}

// Component kedua yang pakai CustomCompFirst
type CustomCompSecondProps = CustomCompFirstProps & {
  random?: number;
};

export function CustomCompSecond({
  header,
  description,
  random,
}: CustomCompSecondProps) {
  return (
    <div>
      <CustomCompFirst
        header={header}
        description={description}
      />
      {random !== undefined && <span>Random: {random}</span>}
    </div>
  );
}
```

## Jawaban Soal Kedua

**TanStack** adalah sebuah ekosistem _open-source_ yang menyediakan berbagai library untuk React dan framework modern lainnya. Beberapa library populernya antara lain:

- **TanStack Query**
- **TanStack Table**
- **TanStack Router**

---

### Pemahaman tentang TanStack Query

**TanStack Query** adalah library yang berfungsi untuk mengatur **data fetching**, **caching**, dan **state management** untuk data asinkron.

Beberapa poin penting:

- Data yang di-_fetch_ akan disimpan (cache) berdasarkan **`queryKey`**.
- Jika `queryKey` **sama**, TanStack Query akan langsung menampilkan data dari cache (tanpa memanggil API ulang).
- Jika `queryKey` **berbeda**, TanStack Query akan melakukan request baru ke API.

Dengan pendekatan ini, TanStack Query:

- Membantu **mengurangi redundant request**.
- Membuat aplikasi lebih **responsif**.
- Menyediakan fitur tambahan seperti **refetch otomatis**, **background updates**, dan **error handling** yang lebih sederhana.

---

### Pentingnya QueryKey

`queryKey` digunakan untuk menentukan identitas unik dari sebuah query.

- Biasanya berupa **array**.
- **Urutan elemen sangat penting**.
- Jika urutannya berbeda, maka dianggap sebagai `queryKey` yang berbeda meskipun isinya mirip.

Contoh:

```ts
// QueryKey dianggap sama
["products", { page: 1, limit: 10 }];
["products", { page: 1, limit: 10 }];
```

```ts
// QueryKey dianggap berbeda (urutan berbeda)
[{ page: 1, limit: 10 }, "products"];
// Beda object reference walaupun isi mirip → dianggap berbeda
["products", { limit: 10, page: 1 }];
```

---

### Strategi Refetch dan Stale Time

Agar cache bekerja optimal, kita perlu menentukan strategi **refetch** dan **staleTime**.

Jika tidak diatur, TanStack Query bisa terus-menerus menembak API meskipun `queryKey` sudah sama.

Contoh konfigurasi:

```ts
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // tidak refetch saat tab kembali fokus
      refetchOnMount: false, // tidak refetch saat komponen mount ulang
      retry: 1, // maksimal 1x retry jika error
      staleTime: 1000 * 60 * 3, //data akan dianggap fresh selama nilai staleTime yang ditentukan (misalnya 3 menit); jika tidak diatur (default 0), data langsung dianggap stale sehingga TanStack Query akan selalu melakukan fetch ulang.
    },
    mutations: {
      retry: 1,
    },
  },
});
```

> Dan masih banyak opsi konfigurasi lain yang bisa disesuaikan dengan kebutuhan.

---

### Query Invalidation

Saya juga memahami konsep **query invalidation**, yang biasanya dilakukan setelah melakukan **mutation**.

Contoh:

```tsx
// Kita punya queryKey
["products"];

// Setelah mutation, kita invalidate
queryClient.invalidateQueries({
  queryKey: ["products"],
});
```

Jika queryKey lebih spesifik:

```tsx
// QueryKey spesifik
["products", "abc"];

// Maka kita perlu invalidate dengan key yang sama persis
queryClient.invalidateQueries({
  queryKey: ["products", "abc"],
});
```

Atau jika ada beberapa variasi:

```tsx
// Dua queryKey berbeda
["products", "abc"];
["products", "bca"];

// Kita bisa invalidate keduanya dengan key utama
queryClient.invalidateQueries({
  queryKey: ["products"],
});
```

### Enabled Queries

TanStack Query juga mendukung enabled queries, yaitu query yang hanya dijalankan ketika kondisi tertentu terpenuhi.

```tsx
useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
  enabled: !!userId, // hanya jalan jika userId ada
});
```

### Suspense Query

Selain `useQuery`, TanStack Query juga mendukung **Suspense Query**.

- `useQuery` → nilai `data` bertipe `T | undefined` karena data bisa saja belum ada.
- `useSuspenseQuery` → nilai `data` bertipe `T` (pasti ada), karena React Suspense akan menunda render sampai data selesai di-fetch.

```tsx
// Contoh useQuery
const { data } = useQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});
// data: User | undefined

// Contoh useSuspenseQuery
const { data } = useSuspenseQuery({
  queryKey: ["user", userId],
  queryFn: () => fetchUser(userId),
});
// data: User (pasti ada)
```

Fitur ini berguna jika kita ingin menulis component yang lebih sederhana tanpa perlu banyak pengecekan `if (!data) ...`. Namun kita perlu wrap component yang menggunakan useSuspenseQuery dengan `<Suspense fallback={<div>Loading...</div>}>`:

```tsx
<Suspense fallback={<div>Loading...</div>}>
  <ComponentWithSuspenseQuery />
</Suspense>
```

### Infinite Query

Saya juga memahami Infinite Query dan bahkan sudah mengimplementasikannya di project ini. Fitur ini berguna untuk pagination dengan mekanisme load more / infinite scroll, di mana query akan otomatis mengelola halaman data berikutnya.

### Prefetch

Saya juga mengimplementasikan prefetch query, misalnya ketika sebuah link di-hover. Dengan begitu, data sudah siap di-cache sebelum user benar-benar membuka halaman tersebut, sehingga transisi jadi lebih cepat.
