import WorkspacesIcon from '@mui/icons-material/Workspaces';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import ComputerIcon from '@mui/icons-material/Computer';
 import FiberNewIcon from '@mui/icons-material/FiberNew';
 import SwapVertIcon from '@mui/icons-material/SwapVert';
 import LocalOfferIcon from '@mui/icons-material/LocalOffer';

export const filterCategory = [
    {
      id: 1,
      filterbyTitle: 'Filter by Category',
    },
    {
      id: 2,
      name: 'All',
      sort: 'All',
      icon: WorkspacesIcon,
    },
    {
      id: 3,
      name: 'Fashion',
      sort: 'fashion',
      icon: CheckroomIcon,
    },
    {
      id: 4,
      name: 'Books',
      sort: 'books',
      icon: LibraryBooksIcon,
    },
    {
      id: 5,
      name: 'Toys',
      sort: 'toys',
      icon: InsertEmoticonIcon,
    },
    {
      id: 6,
      name: 'Electronics',
      sort: 'electronics',
      icon: ComputerIcon,
    },
    {
      id: 7,
      devider: true,
    },
  ];


 export  const filterbySort = [
    { id: 1, value: 'newest', label: 'Newest', icon: FiberNewIcon },
    { id: 2, value: 'priceDesc', label: 'Price: High-Low', icon: SwapVertIcon },
    { id: 3, value: 'priceAsc', label: 'Price: Low-High', icon: SwapVertIcon },
    { id: 4, value: 'discount', label: 'Discounted', icon: LocalOfferIcon },
  ];

  export const filterbyPrice = [
    {
      id: 0,
      label: 'All',
      value: 'All',
    },
    {
      id: 1,
      label: '0-50',
      value: '0-50',
    },
    {
      id: 3,
      label: '50-100',
      value: '50-100',
    },
    {
      id: 4,
      label: '100-200',
      value: '100-200',
    },
    {
      id: 5,
      label: 'Over 200',
      value: '200-99999',
    },
  ];