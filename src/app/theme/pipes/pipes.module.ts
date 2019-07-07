import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginationPipe} from './pagination/pagination.pipe';
import { ProfilePicturePipe } from './profilePicture/profilePicture.pipe';
import { PlantSearchPipe } from './search/plant-search.pipe';

@NgModule({
    imports: [ 
        CommonModule 
    ],
    declarations: [
        PaginationPipe,
        ProfilePicturePipe,
        PlantSearchPipe,
    ],
    exports: [
        PaginationPipe,
        ProfilePicturePipe,
        PlantSearchPipe,
    ]
})
export class PipesModule { }
