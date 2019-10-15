import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { ListableObject } from '../listable-object.model';
import { ViewMode } from '../../../../core/shared/view-mode.model';
import { Context } from '../../../../core/shared/context.model';
import { getListableObjectComponent } from './listable-object.decorator';
import { GenericConstructor } from '../../../../core/shared/generic-constructor';
import { ListableObjectDirective } from './listable-object.directive';
import { CollectionElementLinkType } from '../../collection-element-link.type';

@Component({
  selector: 'ds-listable-object-component-loader',
  // styleUrls: ['./listable-object-component-loader.component.scss'],
  templateUrl: './listable-object-component-loader.component.html'
})
/**
 * Component for determining what component to use depending on the item's relationship type (relationship.type)
 */
export class ListableObjectComponentLoaderComponent implements OnInit {
  /**
   * The item or metadata to determine the component for
   */
  @Input() object: ListableObject;

  // TODO DO SOMETHING WITH THIS
  @Input() index: number;
  /**
   * The preferred view-mode to display
   */
  @Input() viewMode: ViewMode;

  @Input() context: Context;
  @Input() linkType: CollectionElementLinkType;
  @ViewChild(ListableObjectDirective) listableObjectDirective: ListableObjectDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.getComponent());

    const viewContainerRef = this.listableObjectDirective.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (componentRef.instance as any).object = this.object;
    (componentRef.instance as any).index = this.index;
    (componentRef.instance as any).linkType = this.linkType;
  }

  /**
   * Fetch the component depending on the item's relationship type
   * @returns {string}
   */
  private getComponent(): GenericConstructor<Component> {
    return getListableObjectComponent(this.object.getRenderTypes(), this.viewMode, this.context)
  }
}
