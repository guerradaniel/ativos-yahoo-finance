import { RouterModule, Routes } from "@angular/router";
import { AssetVariationComponent } from "./asset-variation/asset-variation.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component: AssetVariationComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AssetVariationRoutingModule { }