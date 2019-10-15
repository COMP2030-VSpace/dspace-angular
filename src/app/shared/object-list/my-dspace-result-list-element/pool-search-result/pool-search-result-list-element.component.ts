import { Component, Inject, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { find } from 'rxjs/operators';

import { ViewMode } from '../../../../core/shared/view-mode.model';
import { RemoteData } from '../../../../core/data/remote-data';
import { isNotUndefined } from '../../../empty.util';
import { WorkflowItem } from '../../../../core/submission/models/workflowitem.model';
import { PoolTask } from '../../../../core/tasks/models/pool-task-object.model';
import { MyDspaceItemStatusType } from '../../../object-collection/shared/mydspace-item-status/my-dspace-item-status-type';
import { listableObjectComponent } from '../../../object-collection/shared/listable-object/listable-object.decorator';
import { PoolTaskSearchResult } from '../../../object-collection/shared/pool-task-search-result.model';
import { SearchResultListElementComponent } from '../../search-result-list-element/search-result-list-element.component';
import { TruncatableService } from '../../../truncatable/truncatable.service';
import { Item } from '../../../../core/shared/item.model';

/**
 * This component renders pool task object for the mydspace result in the list view.
 */
@Component({
  selector: 'ds-pool-search-result-list-element',
  styleUrls: ['../my-dspace-result-list-element.component.scss'],
  templateUrl: './pool-search-result-list-element.component.html',
})

@listableObjectComponent(PoolTaskSearchResult, ViewMode.ListElement)
export class PoolSearchResultListElementComponent extends SearchResultListElementComponent<PoolTaskSearchResult, PoolTask> implements OnInit {

  /**
   * A boolean representing if to show submitter information
   */
  public showSubmitter = true;

  /**
   * Represent item's status
   */
  public status = MyDspaceItemStatusType.WAITING_CONTROLLER;

  /**
   * The workflowitem object that belonging to the result object
   */
  public workflowitem: WorkflowItem;

  public index: number;

  constructor(protected truncatableService: TruncatableService) {
    super(truncatableService);
  }

  /**
   * Initialize all instance variables
   */
  ngOnInit() {
    super.ngOnInit();
    this.initWorkflowItem(this.dso.workflowitem as Observable<RemoteData<WorkflowItem>>);
  }

  /**
   * Retrieve workflowitem from result object
   */
  initWorkflowItem(wfi$: Observable<RemoteData<WorkflowItem>>) {
    wfi$.pipe(
      find((rd: RemoteData<WorkflowItem>) => (rd.hasSucceeded && isNotUndefined(rd.payload)))
    ).subscribe((rd: RemoteData<WorkflowItem>) => {
      this.workflowitem = rd.payload;
    });
  }
}
